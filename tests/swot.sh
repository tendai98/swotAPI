#!/bin/bash

function createSWOT(){
	curl "http://127.0.0.1:5000/api?cmd=swot&op=create&name=ManagersSWOT1&level=Manager&creator=manager101&token=36dfc524ba38c0d88bf0cdd0250881e41ff9f498af6329b340785d56c19ff286"
	curl "http://127.0.0.1:5000/api?cmd=swot&op=create&name=ManagersSWOT2&level=Manager&creator=manager102&token=36dfc524ba38c0d88bf0cdd0250881e41ff9f498af6329b340785d56c19ff286"
	curl "http://127.0.0.1:5000/api?cmd=swot&op=create&name=ManagersSWOT3&level=Manager&creator=manager103&token=36dfc524ba38c0d88bf0cdd0250881e41ff9f498af6329b340785d56c19ff286"
        curl "http://127.0.0.1:5000/api?cmd=swot&op=create&name=ManagersSWOT4&level=Manager&creator=manager104&token=36dfc524ba38c0d88bf0cdd0250881e41ff9f498af6329b340785d56c19ff286"
}

function readSWOT(){
	curl "http://127.0.0.1:5000/api?cmd=swot&op=read&level=Manager&user=manager101&token=36dfc524ba38c0d88bf0cdd0250881e41ff9f498af6329b340785d56c19ff286"
	curl "http://127.0.0.1:5000/api?cmd=swot&op=read&level=Manager&user=manager102&token=36dfc524ba38c0d88bf0cdd0250881e41ff9f498af6329b340785d56c19ff286"
        curl "http://127.0.0.1:5000/api?cmd=swot&op=read&level=Manager&user=manager103&token=36dfc524ba38c0d88bf0cdd0250881e41ff9f498af6329b340785d56c19ff286"
        curl "http://127.0.0.1:5000/api?cmd=swot&op=read&level=Manager&user=manager104&token=36dfc524ba38c0d88bf0cdd0250881e41ff9f498af6329b340785d56c19ff286"
}

function updateSWOT(){
	curl "http://127.0.0.1:5000/api?cmd=swot&op=update&level=Manager&destination=manager102&id=EM1234&comment=This%20is%20a%20test%20Comment&score=1&target=strength&swotid=548445e067933bcc0802879f7af2d71c6f80e3739f0a14e01a1f4af498824b86&token=36dfc524ba38c0d88bf0cdd0250881e41ff9f498af6329b340785d56c19ff286"
	curl "http://127.0.0.1:5000/api?cmd=swot&op=update&level=Manager&destination=manager102&id=EM1234&comment=This%20is%20a%20test%20Comment&score=2&target=weaknesses&swotid=548445e067933bcc0802879f7af2d71c6f80e3739f0a14e01a1f4af498824b86&token=36dfc524ba38c0d88bf0cdd0250881e41ff9f498af6329b340785d56c19ff286"
	curl "http://127.0.0.1:5000/api?cmd=swot&op=update&level=Manager&destination=manager102&id=EM1234&comment=This%20is%20a%20test%20Comment&score=3&target=opportunites&swotid=548445e067933bcc0802879f7af2d71c6f80e3739f0a14e01a1f4af498824b86&token=36dfc524ba38c0d88bf0cdd0250881e41ff9f498af6329b340785d56c19ff286"
	curl "http://127.0.0.1:5000/api?cmd=swot&op=update&level=Manager&destination=manager102&id=EM1234&comment=This%20is%20a%20test%20Comment&score=4&target=threats&swotid=548445e067933bcc0802879f7af2d71c6f80e3739f0a14e01a1f4af498824b86&token=36dfc524ba38c0d88bf0cdd0250881e41ff9f498af6329b340785d56c19ff286"
}


function deleteSWOT(){
	curl "http://127.0.0.1:5000/api?cmd=swot&op=delete&level=Manager&creator=manager101&id=bd85eb587feab2cd55636eacf34197083a468fb6a5515e2150ce0898604e8409&token=36dfc524ba38c0d88bf0cdd0250881e41ff9f498af6329b340785d56c19ff286"
}

function listSWOT(){
	curl "http://127.0.0.1:5000/api?cmd=swot&op=list&token=f0016a758e51da9083038bb1a1ad53a4384499a922da6efb0a56e5dd7785f838"
}

createSWOT
readSWOT
updateSWOT
deleteSWOT
listSWOT
