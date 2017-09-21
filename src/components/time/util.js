define(["common"], function (e) {
    var t = {
            dateToDay: function (r) {
                var n = r,
                    a = t.formatDateTime(new Date, "yyyy-MM-dd");
                (e.page.versions.iPhone || e.page.versions.iPad || e.page.versions.ios) && (r = r.toString().replace(/-/g, "/")), r = t.formatDateTime(new Date(r), "yyyy-MM-dd"), a = new Date(a).getTime(), r = new Date(r).getTime();
                var u = r - a,
                    i = parseInt(u / 864e5),
                    l = n.substring(8, n.indexOf(" ")) + "日";
                return 2 == i ? l = "后天" : 1 == i ? l = "明天" : 0 == i && (l = "今天"), l
            },
            DayTodate: function (e) {
                var t = function (e) {
                        return e += "", e.replace(/^(\d)$/, "0$1")
                    },
                    r = 0;
                "明天" == e ? r = 1 : "后天" == e && (r = 2);
                var n = new Date,
                    a = t(n.getFullYear()),
                    u = t(n.getMonth() + 1),
                    i = t(n.getDate() + r);
                return a + "-" + u + "-" + i
            },
            formatDateTime: function (e, t) {
                var r = function (e) {
                        return e += "", e.replace(/^(\d)$/, "0$1")
                    },
                    n = {
                        yyyy: e.getFullYear(),
                        yy: e.getFullYear().toString().substring(2),
                        M: e.getMonth() + 1,
                        MM: r(e.getMonth() + 1),
                        d: e.getDate(),
                        dd: r(e.getDate()),
                        hh: r(e.getHours()),
                        mm: r(e.getMinutes()),
                        ss: r(e.getSeconds()),
                        SSS: r(e.getMilliseconds())
                    };
                return t || (t = "yyyy-MM-dd hh:mm:ss"), t.replace(/([a-z])(\1)*/gi, function (e) {
                    return n[e]
                })
            },
            getUnixTime: function (e) {
                var t = e.replace(/-/g, "/"),
                    r = new Date(t),
                    n = r.getTime().toString();
                return n
            },
            compartoDate: function (e, t) {
                t = t ? t : new Date;
                var r = t.getTime() - e.getTime(),
                    n = Math.floor(r / 864e5),
                    a = r % 864e5,
                    u = Math.floor(a / 36e5),
                    i = a % 36e5,
                    l = (Math.floor(i / 6e4), i % 6e4);
                Math.round(l / 1e3);
                return n < 1 ? u + "小时 " : n + "天" + u + "小时 "
            }
        },
        r = function () {
            return function (e, t) {
                var r, n = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(""),
                    a = [];
                if (t = t || n.length, e)
                    for (r = 0; r < e; r++) a[r] = n[0 | Math.random() * t];
                else {
                    var u;
                    for (a[8] = a[13] = a[18] = a[23] = "-", a[14] = "4", r = 0; r < 36; r++) a[r] || (u = 0 | 16 * Math.random(), a[r] = n[19 == r ? 3 & u | 8 : u])
                }
                return a.join("")
            }
        }(),
        n = {
            preLength: 0,
            isEmojiCharacter: function (e) {
                for (var t = 0; t < e.length; t++) {
                    var r = e.charCodeAt(t);
                    if (55296 <= r && r <= 56319) {
                        if (e.length > 1) {
                            var n = e.charCodeAt(t + 1),
                                a = 1024 * (r - 55296) + (n - 56320) + 65536;
                            if (118784 <= a && a <= 128895) return !0
                        }
                    } else if (e.length > 1) {
                        var n = e.charCodeAt(t + 1);
                        if (8419 == n) return !0
                    } else {
                        if (8448 <= r && r <= 10239) return !0;
                        if (11013 <= r && r <= 11015) return !0;
                        if (10548 <= r && r <= 10549) return !0;
                        if (12951 <= r && r <= 12953) return !0;
                        if (169 == r || 174 == r || 12349 == r || 12336 == r || 11093 == r || 11036 == r || 11035 == r || 11088 == r) return !0
                    }
                }
            },
            isPhoneTel: function (t) {
                function r(e) {
                    var t = /^[\d]+$/g;
                    if (!t.test(e.val())) {
                        var r = e.val();
                        r.replace(/[^0-9]+/, function (t, r, n) {
                            e.val(n.replace(/[^0-9-]/g, ""))
                        })
                    }
                }
                var a = t.val(),
                    u = 0;
                if (u = a.length, u >= 20) return a = a.substr(0, 20), t.value = a, u = 20, void e.mutual.tipsDialog("号码太长了");
                if (u > n.preLength) {
                    var i = t.val(),
                        l = i.substring(0, i.length - 1),
                        o = i.substring(i.length - 1, i.length);
                    if (/^(010|02\d|0[3-9]\d{2})$/.test(l) && t.val(l + "-" + o), /^(010|02\d|0[3-9]\d{2})$/.test(a)) {
                        t.val(a + "-");
                        var f = t.val();
                        t.val(""), t.val(f)
                    }
                    if (a.match(/(010-|02\d-|0[3-9]\d{2}-)/)) {
                        var s = r(t);
                        s && s.length > 0 && (s.forEach(function (e) {
                            "-" != e && (a = a.replace(e, ""))
                        }), t.val(a))
                    } else {
                        var s = r(t);
                        s && s.length > 0 && (s.forEach(function (e) {
                            a = a.replace(e, "")
                        }), t.val(a))
                    }
                }
                n.preLength = t.val().length
            },
            isAddSym: function (e) {
                var t = e.substring(0, 1);
                if ("0" == t && !/-/g.test(e)) {
                    var r = e.substring(0, 3),
                        n = e.substring(0, 4);
                    if (/^(010|02\d)$/.test(r)) return r + "-" + e.substring(3, e.length);
                    if (/^(0[3-9]\d{2})$/.test(n)) return n + "-" + e.substring(4, e.length)
                }
                return e
            },
            isTruePhone: function (t) {
                if (t && t.length > 0) {
                    var r = t.substring(0, 1);
                    if ("1" == r) {
                        var n = /^1[3|4|5|6|7|8|9][0-9]{9}$/;
                        if (!n.test(t)) return e.mutual.tipsDialog("请输入正确的11位手机号"), !1
                    } else {
                        r = t.split("-") && t.split("-")[0];
                        var a = /^(010|02\d|0[3-9]\d{2})$/;
                        if (a.test(r)) {
                            var u = t.match(/-/g);
                            if (u.length > 1) return e.mutual.tipsDialog("请输入正确的手机号，方便跟踪快递和沟通"), !1
                        }
                        if (t.length > 13) return e.mutual.tipsDialog("请输入正确的手机号，方便跟踪快递和沟通"), !1
                    }
                    return !0
                }
            },
            isTwoPhoneTel: function (t) {
                var r = t.val(),
                    n = 0,
                    a = r.replace(/[^0-9,\-,\),\(]/g, "");
                if (n = a.length, n > 16) {
                    var u = a.match(/[\-,\(,\)]/g),
                        i = u ? u.length : 0;
                    if (i > 0) {
                        if (n <= 20) return void t.val(a);
                        a = a.substr(0, 20)
                    } else a = a.substr(0, 16);
                    return t.val(a), void e.mutual.tipsDialog("号码太长了")
                }
                t.val(a)
            },
            isNumber: function (e) {
                var t = /^[\d]+$/g;
                if (!t.test(e.val())) {
                    var r = e.val();
                    r.replace(/[^0-9]/, function (t, r, n) {
                        e.val(n.replace(/[^0-9]/g, ""))
                    })
                }
            },
            isPhone: function (e) {
                var t = /^1[3|4|5|6|7|8|9][0-9]{9}$/;
                return t.test(e)
            },
            isTel: function (e) {
                var t = /^1[3|5|7|8][0-9]{9}$/;
                return t.test(e)
            },
            isFull: function (e) {
                console.log("Full")
            },
            ispattern: function (e) {
                var t = /[^\u4E00-\uFA29-a-z-A-Z-]/g;
                return t.test(e)
            },
            isNumLetCha: function (t, r) {
                var n = t.val(),
                    a = n.replace(/[^A-Za-z0-9,\u4E00-\uFA29]/g, "");
                n.trim() != a && (e.mutual.tipsDialog(r), t.val(a))
            },
            trim: function (e) {
                return e.replace(/(^\s*)|(\s*$)|(\s{2,})/g, "")
            },
            getCEL: function (e) {
                if (!e) return e;
                for (var t = 0, r = e.length, n = -1, a = 0; a < r; a++) n = e.charCodeAt(a), t += n >= 0 && n <= 128 ? 1 : 2;
                return t
            },
            subCEL: function (e, t) {
                if (!e) return e;
                for (var r = 0, n = e.length, a = -1, u = 1, i = 0; i < n; i++)
                    if (a = e.charCodeAt(i), a >= 0 && a <= 128 ? (r += 1, u = 1) : (r += 2, u = 2), r > t) return e = e.substr(0, i);
                return e
            },
            isSpecialStr: function (e) {
                if (!(e.value.length > 20)) {
                    var t = /^([\u4E00-\uFA29]*[a-z]*[A-Z ]*)+$/;
                    if (t.test(e.value)) return !0;
                    var r = e.value;
                    return r.replace(/[^\u4E00-\uFA29a-zA-Z ]+/, function (t, r, n) {
                        return e.value = n.replace(/[^\u4E00-\uFA29a-zA-Z ]/g, ""), !1
                    }), !1
                }
            },
            filterStrbyReg: function (e) {
                var t = /[\u4E00-\uFA29]/;
                if (t.test(e.value)) {
                    var r = e.value;
                    return r.replace(/[\u4E00-\uFA29]+/, function (t, r, n) {
                        return e.value = n.replace(/[\u4E00-\uFA29]/g, ""), !1
                    }), !1
                }
                return !0
            },
            isSpecial: function (e) {
                var t = /^([\u4E00-\uFA29]*[a-z]*[A-Z ]*[0-9]*)+$/;
                if (t.test(e.val())) return !0;
                var r = e.val();
                return r.replace(/[^\u4E00-\uFA29a-zA-Z ]+/, function (t, r, n) {
                    return e.val(n.replace(/[^\u4E00-\uFA29a-zA-Z0-9 ]/g, "")), !1
                }), !1
            },
            isInArray: function (e, t) {
                var r, n;
                if (!(e instanceof Array) || 0 === e.length) return !1;
                if ("function" == typeof Array.prototype.indexOf) return !!~e.indexOf(t);
                for (r = 0, n = e.length; r < n; r++)
                    if (t === e[r]) return !0;
                return !1
            },
            unique: function (e) {
                for (var t = [], r = {}, n = 0; n < e.length; n++) r[e[n]] || (r[e[n]] = !0, t.push(e[n]));
                return t
            },
            mail: function (e) {
                e = e.trim();
                var t = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,5}$/,
                    r = t.test(e);
                return r
            }
        };
    return {
        DateFormat: t,
        check: n,
        uuid: r
    }
});
//# sourceMappingURL=units.js.map