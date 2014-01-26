/**
 * Created by QETHAN on 14-1-26.
 */
//var re = /<%([^%>]+)?%>/g;
//var tpl = "<p>Hello, my name is <%name%>. I\'m <%age%> years old.</p>";

//["<%name%>", "name", index: 21, input: "<p>Hello, my name is <%name%>. I'm <%age%> years old.</p>"]
//while(match = re.exec(tpl)) {
//	console.log(match);
//}

//["<%name%>", "<%age%>"]
//console.log(tpl.match(re));
var tpl = "";


var TemplateEngine = function(tpl, data) {

	var re = /<%([^%>]+)?%>/g,
			reExp = /(^( )?(if|for|else|switch|case|break|{|}))(.*)?/g,
			code = 'var r=[];\n',
			cursor = 0;

	var add = function(line,js) {
		js ? code += line.match(reExp) ? line+'\n' : 'r.push('+line+');\n' :
				code += 'r.push("'+line.replace(/"/g,'\\"')+'");\n';
	}

	while(match = re.exec(tpl)) {
		add(tpl.slice(cursor,match.index));
		add(match[1].trim(),true);
		cursor = match.index + match[0].length;
	}

	add(tpl.substr(cursor, tpl.length - cursor));
	code += 'return r.join("");';
	return new Function(code.replace(/[\r\t\n]/g,'')).apply(data);
}

