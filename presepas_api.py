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
from api_messages import WisdomMessageRequest,WisdomMessageResponse,RandomMessageRequest


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

    @endpoints.method(RandomMessageRequest, WisdomMessageResponse,
                      path = "wisdom/random", name = "random", http_method = "GET")
    def get_random_wisdom(self, request):
        top_code_obj = IdController.get_by_code("wisdom")
        if not top_code_obj:
            return WisdomMessageResponse()
        else:
            top_code = top_code_obj.value
            rdm = request.current
            while rdm == request.current:
                rdm = random.randint(1, top_code)
            wisdom = Wisdom.get_by_code(rdm)
            return wisdom.to_message()


APPLICATION = endpoints.api_server([PresepasApi])
