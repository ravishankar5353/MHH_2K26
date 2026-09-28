import os
import httpx
import logging
from typing import List, Dict, Any, Optional
from datetime import datetime

logger = logging.getLogger("dealmind.hindsight")

class HindsightService:
    def __init__(self):
        self.base_url = os.getenv("HINDSIGHT_BASE_URL", "https://api.hindsight.ai/v1")
        self.api_key = os.getenv("HINDSIGHT_API_KEY", "")
        self.in_memory_banks: Dict[str, List[Dict[str, Any]]] = {}

    def is_live(self) -> bool:
        return bool(self.api_key and self.api_key != "your_hindsight_api_key_here")

    async def retain(self, deal_id: str, content: str, memory_type: str, metadata: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
        """
        Retains an experience into the Hindsight memory bank for a deal (bank_id: deal_<deal_id>).
        """
        bank_id = f"deal_{deal_id}"
        meta = metadata or {}
        entry = {
            "id": f"mem_{datetime.now().timestamp()}",
            "bank_id": bank_id,
            "content": content,
            "memory_type": memory_type, # Experience, World/Entity, Observation/Pattern
            "metadata": meta,
            "created_at": datetime.now().isoformat()
        }

        # Save to local bank array
        if bank_id not in self.in_memory_banks:
            self.in_memory_banks[bank_id] = []
        self.in_memory_banks[bank_id].append(entry)

        # If live API key is present, attempt remote call to Hindsight service
        if self.is_live():
            try:
                async with httpx.AsyncClient(timeout=5.0) as client:
                    resp = await client.post(
                        f"{self.base_url}/banks/{bank_id}/retain",
                        headers={"Authorization": f"Bearer {self.api_key}", "Content-Type": "application/json"},
                        json={
                            "content": content,
                            "type": memory_type,
                            "metadata": meta
                        }
                    )
                    if resp.status_code in [200, 201]:
                        remote_data = resp.json()
                        logger.info(f"Successfully retained memory in Hindsight remote API: {remote_data}")
                        entry["hindsight_reference"] = remote_data.get("id", entry["id"])
            except Exception as e:
                logger.warning(f"Hindsight API retain call failed, falling back to local memory store: {e}")

        return entry

    async def recall(self, deal_id: str, query: str, top_k: int = 5) -> List[Dict[str, Any]]:
        """
        Recalls the most relevant historical memories from Hindsight for a deal.
        """
        bank_id = f"deal_{deal_id}"
        
        if self.is_live():
            try:
                async with httpx.AsyncClient(timeout=5.0) as client:
                    resp = await client.post(
                        f"{self.base_url}/banks/{bank_id}/recall",
                        headers={"Authorization": f"Bearer {self.api_key}", "Content-Type": "application/json"},
                        json={"query": query, "top_k": top_k}
                    )
                    if resp.status_code == 200:
                        results = resp.json().get("memories", [])
                        if results:
                            return results
            except Exception as e:
                logger.warning(f"Hindsight API recall call failed, using local bank: {e}")

        # Local recall matching simple search
        bank = self.in_memory_banks.get(bank_id, [])
        query_words = set(query.lower().split())
        scored_memories = []
        for mem in bank:
            content_lower = mem["content"].lower()
            score = sum(1 for w in query_words if w in content_lower)
            scored_memories.append((score, mem))
        
        scored_memories.sort(key=lambda x: x[0], reverse=True)
        return [mem for _, mem in scored_memories[:top_k]]

    async def reflect(self, deal_id: str, prompt: str) -> str:
        """
        Reflects over accumulated memory to generate deeper insights.
        """
        bank_id = f"deal_{deal_id}"
        memories = await self.recall(deal_id, prompt, top_k=10)
        
        if self.is_live():
            try:
                async with httpx.AsyncClient(timeout=7.0) as client:
                    resp = await client.post(
                        f"{self.base_url}/banks/{bank_id}/reflect",
                        headers={"Authorization": f"Bearer {self.api_key}", "Content-Type": "application/json"},
                        json={"prompt": prompt}
                    )
                    if resp.status_code == 200:
                        return resp.json().get("reflection", "")
            except Exception as e:
                logger.warning(f"Hindsight API reflect call failed: {e}")

        # Synthesis summary of memories
        mem_summaries = [m["content"] for m in memories]
        return f"Reflection based on {len(memories)} historical deal memories: " + " | ".join(mem_summaries[:3])

    def get_memory_count(self, deal_id: str) -> int:
        bank_id = f"deal_{deal_id}"
        return len(self.in_memory_banks.get(bank_id, []))

# Singleton instance
hindsight_engine = HindsightService()
