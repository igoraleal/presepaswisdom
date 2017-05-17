"""Hello World API implemented using Google Cloud Endpoints.
Contains declarations of endpoint, endpoint methods,
as well as the ProtoRPC message class and container required
for endpoint method definition.
"""
import endpoints
import logging
import random
from protorpc import messages
from protorpc import message_types
from protorpc import remote
from models import Wisdom,IdController
from api_messages import WisdomMessageRequest,WisdomMessageResponse,WisdomCode,WisdomListMessageResponse,FlagResult


@endpoints.api(name='presepasendpoints', version='v1')
class PresepasApi(remote.Service):
  """API v1."""

  @endpoints.method(WisdomMessageRequest, WisdomMessageResponse,
            path = "wisdom/new", name = "insert")
  def insert_wisdom(self, request):
    if not request.text:
      raise endpoints.BadRequestException("Text is required")
    top_code = IdController.get_by_code("wisdom")
    if top_code:
      wisdom_code = top_code.value + 1
    else:
      wisdom_code = 1
    IdController.insert(code="wisdom",value=wisdom_code)
    Wisdom.insert(code = wisdom_code, text = request.text)
    return WisdomMessageResponse(code=wisdom_code, text=request.text)

  @endpoints.method(WisdomCode, WisdomMessageResponse,
            path = "wisdom/random", name = "random", http_method = "GET")
  def get_random_wisdom(self, request):
    top_code_obj = IdController.get_by_code("wisdom")
    if not top_code_obj:
      return WisdomMessageResponse()
    else:
      top_code = top_code_obj.value
      wisdom = None
      while not wisdom:
        rdm = request.code
        while rdm == request.code:
          rdm = random.randint(1, top_code)
          wisdom = Wisdom.get_by_code(rdm)
      return wisdom.to_message()

  @endpoints.method(message_types.VoidMessage, WisdomListMessageResponse,
            path = "wisdom/list", name = "list", http_method = "GET")
  def get_all_wisdom(self, request):
    models = Wisdom.get_all()
    if models:
      result = []
      for model in models:
        result.append(model.to_message())
      return WisdomListMessageResponse(items=result)
    else:
      return WisdomListMessageResponse()


  @endpoints.method(WisdomCode, FlagResult, path = "wisdom/delete", name = "delete")
  def delete(self, request):
    if request.code:
      Wisdom.delete(request.code)
      return FlagResult(result="OK")
    else:
      return FlagResult(result="No code")
    

APPLICATION = endpoints.api_server([PresepasApi])
