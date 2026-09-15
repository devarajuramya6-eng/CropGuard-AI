from sqlalchemy.orm import Session
from models.farm import Farm
from models.field import Field

class AssistantEngine:
    """
    Core RAG (Retrieval-Augmented Generation) style engine for the Agriculture Assistant.
    It intercepts user queries, retrieves their specific farm/field context from the DB,
    and returns a simulated contextual answer.
    """
    
    def process_query(self, user_id: int, query: str, db: Session) -> str:
        query_lower = query.lower()
        
        # Intent: Querying owned crops/farms
        if "what crops" in query_lower or "my farms" in query_lower:
            farms = db.query(Farm).filter(Farm.owner_id == user_id).all()
            if not farms:
                return "You haven't registered any farms yet. Would you like me to help you create one?"
            
            response = "Here is what you are currently managing:\n"
            for farm in farms:
                fields = db.query(Field).filter(Field.farm_id == farm.id).all()
                crops = [f.crop_type for f in fields if f.crop_type]
                crop_str = ", ".join(set(crops)) if crops else "no crops planted yet"
                response += f"- {farm.name} ({farm.area} acres): {crop_str}.\n"
            return response
            
        # Intent: Querying disease history
        elif "tomato problems" in query_lower or "recent disease" in query_lower:
            return "Looking at your recent records, on June 15th, the AI detected 'Early Blight' in your North Tomato Plot with moderate severity. Would you like to review the treatment recommendations for Early Blight?"
            
        # Fallback agricultural response
        return "I can help you manage your farms, analyze disease history, and check weather risks. Could you provide a bit more detail on what you need?"

assistant_engine = AssistantEngine()
