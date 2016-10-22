from google.appengine.ext import ndb
from api_messages import WisdomMessageResponse

class PresepasModel(ndb.Model):

    @classmethod
    def insert(cls, **kwargs):
        c_key = ndb.Key(cls, kwargs.get("code"))
        cls(key=c_key,**kwargs).put()

    @classmethod
    def delete(cls, code):
        c_key = ndb.Key(cls, code)
        c_key.delete()

    @classmethod
    def get_all(cls):
        return cls.query().fetch(limit=1000)

    @classmethod
    def get_by_code(cls, codeProp):
        return ndb.Key(cls, codeProp).get()

class Wisdom(PresepasModel):
    """Ingredient - Ingredient model"""
    code = ndb.IntegerProperty(required=True)
    text = ndb.StringProperty(required=True)

    def to_message(self):
        """Return message associated with the model."""
        return WisdomMessageResponse(code=self.code, text=self.text)

class IdController(PresepasModel):
	code = ndb.StringProperty(required=True)
	value = ndb.IntegerProperty(required=True)