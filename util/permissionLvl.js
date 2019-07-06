module.exports = function (member = false) {

    if (!member) return -1;

    var cAdmin = "ADMINISTRATOR";
    var admin  = "BAN_MEMBERS";
    var vip    = "CHANGE_NICKNAME";

    if (member.hasPermission(cAdmin)) return 3;
    else if (member.hasPermission(admin)) return 2;
    else if (member.hasPermission(vip)) return 1;
    else return 0;

};