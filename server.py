#!flask/bin/python

from flask import Flask,jsonify,abort,make_response,request,json
import httplib,urllib
import pdb

app=Flask(__name__)
varis = {}

@app.errorhandler(404)
def not_found(error):
    return make_response(jsonify({'error': 'Not found'}), 404)
@app.route("/set_config",methods=['POST'])
def set_config():
    url = "539a85ff.ngrok.io:80"
    #pdb.settrace()
    jdata=json.dumps(request.form)
    print request.args
    print request.json
    print request.form
    print jdata
    headers={"Content-type": "application/json"}
    conn = httplib.HTTPConnection(url)
    conn.request("POST","/set_config",jdata,headers)
    response = conn.getresponse()
    content=response.read()
    content=json.loads(content)
    resp=jsonify(content)
    resp.headers["Access-Control-Allow-Origin"]='*'
    return resp

@app.route('/variables/<string:variable_id>', methods=['GET'])
def get_variable(variable_id):
    if variable_id not in varis.keys() :
        not_found(404)
    print varis
    print jsonify({variable_id : varis[variable_id]}).data
    return jsonify(varis[variable_id]),201
     
@app.route('/variables/add', methods=['POST'])
def add_variable():
    if not request.json:
        abort(400)
    varis.update(request.json)
    print varis
    resp = jsonify(varis)
    resp.headers["Access-Control-Allow-Origin"] = "*"
    return resp, 201
@app.route('/variables/delete/<string:variable_id>', methods=['DELETE'])
def delete_variable(variable_id):
    if variable_id not in varis.keys() :
        abort(404)
    varis.pop(variable_id)
    return jsonify({'result': True})

if __name__ == '__main__':
    app.run(host="0.0.0.0",port="8000")
