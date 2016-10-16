#!flask/bin/python

from flask import Flask,jsonify,make_response,request,json
import httplib
import os
app=Flask(__name__)


@app.errorhandler(404)
def not_found(error):
    return make_response(jsonify({'error': 'Not found'}), 404)
@app.route("/set_config",methods=['POST'])
def set_config():
    print request.json
    with open("/home/fchai/server-relay/codegen/config.json", "w") as f:
        json.dump(request.json, f)
    os.system("cd codegen; python3 ./codegen.py; rap deploy -s 10.221.66.14; cd ..")
    return jsonify({"result":True})
@app.route('/variables/<string:variable_id>', methods=['GET'])
def get_variable(variable_id):
    url = "121.201.69.165:8000"    
    conn = httplib.HTTPConnection(url)
    conn.request("GET","/variables/" + variable_id)
    response = conn.getresponse()
    content=response.read()
    content=json.loads(content)
    return jsonify(content)
@app.route('/variables/add', methods=['POST'])
def add_variable():
    url = "121.201.69.165:8000"
    jdata=json.dumps(request.json)
    headers={"Content-type": "application/json"}
    conn = httplib.HTTPConnection(url)
    conn.request("POST","/variables/add",jdata,headers)
    response = conn.getresponse()
    content=response.read()
    content=json.loads(content)

    return jsonify(content)
@app.route('/variables/delete/<string:variable_id>', methods=['DELETE'])
def delete_variable(variable_id):
    url = "121.201.69.165:8000"
    conn = httplib.HTTPConnection(url)
    conn.request("GET","/variables/delete/"+ variable_id)
    response = conn.getresponse()
    content=response.read()
    content=json.loads(content)
    return jsonify(content)

if __name__ == '__main__':
    app.run(host="0.0.0.0",port="80")
