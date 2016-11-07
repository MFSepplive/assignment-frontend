export function valid(email) {
	var re = /[a-z]*\.[mmt]*\-([b][0-9]*)\@[fh]*\-[a-z]*\.[ac]*\.[at]*/;
    return re.test(email);
}

export function degreeProgram(email) {
	var re = /(mmt)/;
	var stringDegree = email.match(re);
	return stringDegree[0].toUpperCase();
}

export function level(email) {
	var re = /(b[0-9]+)/;
	var stringLevel = email.match(re).toString();
	if (stringLevel[0] == 'b') {
		return "BA";
	}
	else
	{
		return "MA";	
	}
}

export function graduationYear(email) {
	var re = /([0-9]+)/;

	var graduationYearNumber = email.match(re).toString();

	return parseInt(graduationYearNumber)+3;
}
