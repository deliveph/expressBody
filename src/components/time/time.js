define(["zepto", "common", "units", "baidumap", "map", "cmctly", "sc"], function (e, t, i, a, n, r, o) {
    function s() {
        var t = setTimeout(function () {
            e(".page-sending .userBoxTip").addClass("hideBoxTip"), clearTimeout(t)
        }, 5e3)
    }

    function d(t) {
        var i = {
                longitude: t.longitude,
                latitude: t.latitude,
                deptCode: t.locationCode,
                storeType: "5",
                currentPage: 1,
                pageCount: 1
            },
            a = JSON.stringify(i),
            n = {
                paramJson: a
            };
        e.ajax({
            type: "POST",
            data: n,
            dataType: "json",
            url: "/cx-wechat-member/member/deliveryPreference/getStoreAddrByLatLon",
            success: function (t) {
                if (t && "true" == t.success && t.obj.datas.length > 0) {
                    var i = '<div class="userBoxTip"><p>小哥下班了~不想等明天上门取件?</p><p>可以先放到丰巢柜哦~<span class="goServerList">戳这里</span></p></div>';
                    e(".page-sending").append(i), s()
                }
            }
        })
    }

    function u() {
        if (!e("#submitBtn").hasClass("gray")) {
            if (!o.formInfo.sendingAddress) return void o.formFromTo.from.sendingFrom.click();
            if (!o.formInfo.receivingAddress) return void o.formFromTo.from.receivingFrom.click();
            o.sending_ctly.submitOrder_clty();
            var a = JSON.parse(t.page.getStorage("orderFormInfo")),
                n = a.receivingAddress,
                s = a.sendingAddress,
                d = "";
            e("#productList li.on").hasClass("unavailable") || (d = e("#productList li.on").attr("id"));
            var u = e("#" + d + " .price").text(),
                l = !0,
                p = t.page.getStorage("memberPhone") || "",
                m = "";
            if (e(".sending-agree").find("p").hasClass("isLook")) {
                var f = e(".sending-agree").find("p");
                return void t.mutual.protocol(function () {
                    f.addClass("selIdo").removeClass("isLook").text("我同意"), localStorage.setItem("isLegalRisk", "true")
                })
            }
            if (d ? g.businessTimeFlg ? /^\d{3,4}$/.test(s.locationCode) ? /^\d{3,4}$/.test(n.locationCode) ? s.county && "null" != s.county ? n.county && "null" != n.county ? i.check.getCEL(s.address) > 100 ? (t.mutual.tipsDialog("寄件地址过长，请修改后提交！"), m = "寄件地址过长！", l = !1) : i.check.getCEL(n.address) > 100 ? (t.mutual.tipsDialog("收件地址过长，请修改后提交！"), m = "收件地址过长！", l = !1) : s.contactPhone && s.contactPhone.length > 14 || s.contactTel && s.contactTel.length > 14 ? (t.mutual.tipsDialog("寄方联系电话过长，请修改后提交！"), m = "寄方联系电话过长！", l = !1) : n.contactPhone && n.contactPhone.length > 14 || n.contactTel && n.contactTel.length > 14 ? (t.mutual.tipsDialog("收方联系电话过长，请修改后提交！"), m = "收方联系电话过长！", l = !1) : s.contactName == n.contactName && s.contactPhone == n.contactPhone && s.contactTel == n.contactTel && s.province == n.province && s.city == n.city && s.county == n.county && s.address == n.address ? (t.mutual.shade("", "您的收寄件人信息重复，请重新录入！", "确定"), m = "寄件人信息和收件人信息不能一致！", l = !1) : "10" == o.editOrderDetail.payment ? p != s.contactTel && (t.mutual.knowShade("alert", "", "为确保先寄后付运费信息的接收，寄件人与登录用户手机号须保持一致，或选择其他付款方式", "我知道了"), m = "为确保先寄后付运费信息的接收，寄件人与登录用户手机号须保持一致，或选择其他付款方式", l = !1) : c && (t.mutual.tipsDialog("请不要着急哦，正在提交中"), m = "请不要着急哦，正在提交中！", l = !1) : (t.mutual.tipsDialog("收件地址信息行政区未找到，请重新编辑地址并且保存！"), m = "收件地址信息行政区未找到，请重新编辑地址并且保存！", l = !1) : (t.mutual.tipsDialog("寄件地址信息行政区未找到，请重新编辑地址并且保存！"), m = "寄件地址信息行政区未找到，请重新编辑地址并且保存！", l = !1) : (t.mutual.tipsDialog("收件地址信息异常，请重新编辑地址并且保存！"), m = "收件地址信息异常-locationCode为空，请重新编辑地址并且保存！", l = !1) : (t.mutual.tipsDialog("寄件地址信息异常，请重新编辑地址并且保存！"), m = "寄件地址信息异常-locationCode为空，请重新编辑地址并且保存！", l = !1) : (t.mutual.tipsDialog("寄件城市目前无法预约下单"), m = "寄件城市目前无法预约下单", l = !1) : (t.mutual.tipsDialog("请选择有效的时效产品哦~"), m = "未请选择有效的时效产品", l = !1), !l) return void o.sending_ctly.submitError_clty(m);
            c = !0;
            var y = a.pickupDate,
                v = y.substring(0, y.indexOf("__")),
                T = y.substring(y.indexOf("__") + 2),
                D = "",
                h = i.DateFormat.formatDateTime(new Date, "yyyy-MM-dd hh:mm:ss"),
                O = s.contactName,
                b = s.contactTel,
                C = JSON.parse(t.page.getStorage("appointSession"));
            if (C && (O = C.appointName, b = C.appointTel), "今天" == v || "" == v) {
                var I = new Date;
                if ("一小时内" != T) {
                    var _ = T.substring(0, T.indexOf("~")) + ":00",
                        S = T.substring(T.indexOf("~") + 1) + ":00";
                    D = i.DateFormat.formatDateTime(I, "yyyy-MM-dd") + " " + _, "00:00:00" == S && (I = new Date(1e3 * (I / 1e3 + 86400))), h = i.DateFormat.formatDateTime(I, "yyyy-MM-dd") + " " + S
                }
            } else {
                var M = new Date;
                "明天" == v ? M = M.setDate(M.getDate() + 1) : "后天" == v && (M = M.setDate(M.getDate() + 2));
                var x = new Date(M),
                    _ = T.substring(0, T.indexOf("~")) + ":00",
                    S = T.substring(T.indexOf("~") + 1) + ":00";
                D = i.DateFormat.formatDateTime(x, "yyyy-MM-dd") + " " + _, "00:00:00" == S && (x = new Date(1e3 * (x / 1e3 + 86400))), h = i.DateFormat.formatDateTime(x, "yyyy-MM-dd") + " " + S
            }
            var F = "";
            "T6" == d ? F = "顺丰隔日" : "T4" == d ? F = "顺丰次日" : "T801" == d ? F = "顺丰次晨" : "T104" == d ? F = "顺丰即日" : "T103" == d && (F = "顺丰即日(专享)");
            var P = "";
            4 == parseInt(o.editOrderDetail.payment) && (P = o.editOrderDetail.monthlyCardNo);
            var w = {
                    language: "zh",
                    sysCode: "WEIXIN",
                    mediaCode: "wx",
                    createTime: "",
                    version: "",
                    countryCode: "CN",
                    pickupType: "1",
                    appointmentNo: "",
                    remark: "",
                    checkword: "",
                    expectStartTm: D,
                    expectFinishTm: h,
                    sendingCityCode: s.cityCode,
                    receivingCityCode: n.cityCode,
                    appointmentInfo: {
                        appointmenterId: s.addressId,
                        contact: s.contactName,
                        phone: s.contactPhone,
                        mobile: s.contactTel,
                        addrInfo: {
                            addrId: s.addressId,
                            locationCode: s.locationCode,
                            country: s.country || "中国",
                            province: s.province,
                            provinceCode: s.provinceCode,
                            city: s.city,
                            county: s.county,
                            countyCode: s.countyCode,
                            postalCode: "",
                            longitude: s.lng || s.longitude,
                            latitude: s.lat || s.latitude,
                            address: s.address
                        }
                    },
                    appointmentList: [{
                        index: "",
                        originateInfo: {
                            originerId: n.addressId,
                            contact: s.contactName,
                            phone: s.contactPhone,
                            mobile: s.contactTel,
                            addrInfo: {
                                addrId: s.addressId,
                                locationCode: s.locationCode,
                                country: s.country,
                                province: s.province,
                                provinceCode: s.provinceCode,
                                city: s.city,
                                county: s.county,
                                countyCode: s.countyCode,
                                postalCode: "",
                                longitude: s.lng || s.longitude,
                                latitude: s.lat || s.latitude,
                                address: s.address
                            }
                        },
                        destinationInfo: {
                            desterId: s.addressId,
                            phone: n.contactPhone,
                            contact: n.contactName,
                            mobile: n.contactTel,
                            addrInfo: {
                                addrId: n.addressId,
                                locationCode: n.locationCode,
                                country: n.country,
                                province: n.province,
                                provinceCode: n.provinceCode,
                                city: n.city,
                                county: n.county,
                                countyCode: n.countyCode,
                                postalCode: "",
                                longitude: n.lng || n.longitude,
                                latitude: n.lat || n.latitude,
                                address: n.address
                            }
                        },
                        levelOfService: {
                            provider: "SF",
                            product: {
                                code: d,
                                name: F
                            }
                        },
                        metaWeight: o.editOrderDetail.metaWeight,
                        remark: "",
                        metaPrice: u,
                        freightFee: {
                            code: "1",
                            amt: u,
                            paymethod: o.editOrderDetail.payment || "1",
                            custid: P
                        },
                        serviceList: {
                            service: [{
                                code: "IN02",
                                attr1: o.editOrderDetail.insurancePrice,
                                attr2: "",
                                attr3: "",
                                attr4: "",
                                attr5: "",
                                feeList: {
                                    fee: [{
                                        code: "3",
                                        amt: o.editOrderDetail.insuranceValueRelevance,
                                        paymethod: o.editOrderDetail.payment || "1",
                                        custid: P
                                    }]
                                }
                            }]
                        },
                        cargoList: [{
                            name: o.editOrderDetail.cargo_name,
                            uom: "",
                            quantity: o.editOrderDetail.quantity,
                            price: ""
                        }]
                    }]
                },
                N = JSON.stringify(w),
                k = {};
            k.jsonStr = N, t.mutual.tipsLoading("下单中"), e("#submitBtn").hasClass("hide") || e("#submitBtn").addClass("gray"), e.ajax({
                type: "POST",
                url: "/cx-wechat-order/order/weixin/sending/bookingOrder",
                data: k,
                dataType: "json",
                timeout: 6e3,
                async: !0,
                success: function (i) {
                    if (c = !1, t.mutual.tipsLoading(), o.sending_ctly.sendingAddrEqual_clty(s.addrId), 0 == i.success || "false" == i.success) {
                        if ("canNotUseSDF" == i.errorCode)
                            if ("returnPay" == i.errorMessage) t.mutual.dialogYN("你有运费未支付，请先去支付", function () {
                                o.editOrderDetail.payment = "1", o.initOrderDetail.payway(o.editOrderDetail.payment)
                            }, function () {
                                o.editOrderDetail.savaSession(), location.href = "/cx/wallet/send-pay.html"
                            }, "稍后再付", "马上支付");
                            else {
                                var a = i.errorMessage.split(",");
                                t.mutual.knowShade("alert", a[0], a[1], "我知道了", "", function () {
                                    o.editOrderDetail.payment = "1", o.initOrderDetail.payway(o.editOrderDetail.payment), o.editOrderDetail.payway(e(".terms .payway .content"))
                                })
                            }
                        else i.errorCode.indexOf("special") != -1 ? t.mutual.tipsDialog(i.errorMessage || i.message) : "EMPTY_LOCATIONCODE_SEND" == i.errorCode ? t.mutual.tipsDialog("寄件地址信息异常，请重新编辑地址并且保存") : "EMPTY_LOCATIONCODE_RECEVING" == i.errorCode ? t.mutual.tipsDialog("收件地址信息异常，请重新编辑地址并且保存") : t.mutual.tipsDialog("下单失败，请稍后重试！");
                        return void(e("#submitBtn").hasClass("gray") && e("#submitBtn").removeClass("gray"))
                    }
                    return i.result.appointmentNo ? (e(".success-animation").fadeIn(), g.appointmentNo = i.result.appointmentNo, o.sending_ctly.submitOrder_TM_clty(i.result.appointmentNo), r.end(), o.formFromTo.emptyAll(), void setTimeout(function () {
                        e(".success-animation").fadeOut(), window.location.href = "/cx/order/order-detail.html?from=sending&appointmentNo=" + i.result.appointmentNo + "&t=" + (new Date).getTime()
                    }, 3e3)) : (t.mutual.tipsDialog("生成预约单失败，请稍后重试！"), void(e("#submitBtn").hasClass("gray") && e("#submitBtn").removeClass("gray")))
                },
                error: function (i, a, n) {
                    c = !1, t.mutual.tipsLoading(), e("#submitBtn").hasClass("gray") && e("#submitBtn").removeClass("gray"), t.mutual.tipsDialog("请稍后重试，或拨打95338下单")
                }
            })
        }
    }
    var c = !1,
        l = {
            querySendAddress: function (i, n, r) {
                o.sending_ctly.mapLoadingEndHTML();
                var s = JSON.parse(localStorage.getItem("local_defaultSendAddr"));
                if (s) return g._queryDay(), g._queryTime(0, "init"), void o.address.saveAddress(s, s.address, s.longitude, s.latitude, u);
                t.mutual.tipsLoading("查询数据中");
                var d = {
                        addressId: "",
                        address: "",
                        contact: "",
                        telPhone: "",
                        queryType: "0",
                        rowCount: "1"
                    },
                    c = JSON.stringify(d),
                    l = {};
                l.jsonStr = c, e.ajax({
                    type: "POST",
                    data: l,
                    dataType: "json",
                    timeout: 3e3,
                    url: "/cx-wechat-order/order/weixin/adress/queryAddress",
                    success: function (e) {
                        if (t.mutual.tipsLoading(), 0 == e.success || "false" == e.success) return void o.formFromTo.update(u);
                        var i = e.obj;
                        if (0 == i) return void o.formFromTo.update(u);
                        var n = i[0].address.replace(/\__/g, "");
                        if ("" == i[0].longitude && "" == i[0].latitude || 0 == parseFloat(i[0].longitude) || 0 == parseFloat(i[0].latitude) || parseFloat(i[0].latitude) > 90) {
                            var s = i[0].province + i[0].city + i[0].county + n;
                            a.getAddressByLocal(i[0].city, s + "", function (e) {
                                var t = "",
                                    a = "";
                                if (e) {
                                    var r = e.split(",");
                                    a = r[0], t = r[1]
                                }
                                g._queryDay(), g._queryTime(0, "init"), o.address.saveAddress(i[0], n, t, a, u), o.address.updateAddress(i[0].addressId, t, a)
                            })
                        } else g._queryDay(), g._queryTime(0, "init"), o.address.saveAddress(i[0], n, i[0].longitude, i[0].latitude, u);
                        "init" == r && (o.sending_ctly.saveSession("sending_ctly_firstAddrId", i[0].addressId), o.sending_ctly.loadHTML())
                    },
                    error: function (e, i, a) {
                        t.mutual.tipsLoading(), o.formFromTo.update(u)
                    }
                })
            }
        },
        p = new Array,
        m = new Array;
    m.push("05:00~06:00"), m.push("06:00~07:00"), m.push("07:00~08:00"), m.push("08:00~09:00"), m.push("09:00~10:00"), m.push("10:00~11:00"), m.push("11:00~12:00"), m.push("12:00~13:00"), m.push("13:00~14:00"), m.push("14:00~15:00"), m.push("15:00~16:00"), m.push("16:00~17:00"), m.push("17:00~18:00"), m.push("18:00~19:00"), m.push("19:00~20:00"), m.push("20:00~21:00"), m.push("21:00~22:00"), m.push("22:00~23:00"), m.push("23:00~00:00");
    var g = {
            appointmentNo: "",
            businessTimeFlg: !0,
            beginTM: 0,
            lastEndTM: 0,
            daylist: {},
            timelist: {},
            businessDate: {},
            serviceDate: "",
            serviceTM: 0,
            _queryDay: function () {
                if (!o.formInfo.sendingAddress) return void g.sysDatebusinessDay();
                var t = o.formInfo.sendingAddress.locationCode,
                    i = {
                        cityCode: t
                    },
                    a = JSON.stringify(i),
                    n = {};
                n.jsonStr = a, e.ajax({
                    type: "POST",
                    url: "/cx-wechat-order/order/weixin/sending/businessTime",
                    data: n,
                    dataType: "json",
                    async: !1,
                    success: function (e) {
                        0 != e.success && "false" != e.success || (e = ""), g.contentBusinessTime(e)
                    },
                    error: function (e, t, i) {
                        g.contentBusinessTime("")
                    }
                })
            },
            contentBusinessTime: function (a) {
                if (!a) {
                    var n = i.DateFormat.formatDateTime(new Date, "yyyy-MM-dd hh:mm:ss"),
                        r = n.substring(11, 16).replace(":", "");
                    a = '{"obj":[{"data":"今天","beginTM":"0800","lastBeginTM":"0800","endTM":"2000","lastEndTM":"2000"},{"data":"明天","beginTM":"0800","lastBeginTM":"0800","endTM":"2000","lastEndTM":"2000"},{"data":"后天","beginTM":"0800","lastBeginTM":"0800","endTM":"2000","lastEndTM":"2000"}],"serviceDate":"' + n + '","serviceTM":" ' + r + '"}', a = JSON.parse(a)
                }
                g.lastEndTM = a.obj[0].lastEndTM, g.beginTM = a.obj[0].beginTM, g.serviceDate = a.serviceDate, g.serviceTM = parseInt(a.serviceTM);
                var s = parseInt(a.serviceTM);
                p.length = 0;
                for (var u = 0; u < a.obj.length; u++) {
                    o.params.businessMap.put(a.obj[u].data, a.obj[u]);
                    var c = a.obj[u].lastEndTM;
                    if ("2359" != c && "" != c && c > a.obj[u].beginTM)
                        if (c.indexOf(":") != -1 && (c = c.replace(":", "")), c = parseInt(c) - 100, "今天" == a.obj[u].data)
                            if (s < c) p.push(a.obj[u].data);
                            else {
                                var l = JSON.parse(t.page.getStorage("orderFormInfo"));
                                if (l.receivingAddress && l.sendingAddress) {
                                    var m = e(".userBoxTip");
                                    m.length || d(l.sendingAddress)
                                }
                            }
                    else p.push(a.obj[u].data);
                    else p.push(a.obj[u].data)
                }
                g.businessDate = a, g.daylist = p
            },
            _queryTime: function (e, i) {
                var a = g.serviceTM,
                    n = new Array,
                    r = g.businessDate;
                if ("" != p[e] && r.obj && 0 != r.obj.length) {
                    for (var s = 0; s < r.obj.length; s++)
                        if (p[e] == r.obj[s].data) {
                            "今天" == p[e] && g.beginTM <= a && n.push("一小时内");
                            for (var d = 0; d < m.length; d++) {
                                var u = m[d].substring(0, m[d].indexOf("~")),
                                    c = m[d].substring(m[d].indexOf("~") + 1),
                                    u = g.resTime(u),
                                    c = g.resTime(c),
                                    l = r.obj[s].beginTM;
                                l.indexOf(":") != -1 && (l = l.replace(":", "")), l = parseInt(l);
                                var f = r.obj[s].lastEndTM;
                                if ("2359" != f && "" != f && f > r.obj[s].beginTM) {
                                    if (c <= 0) continue;
                                    if (f.indexOf(":") != -1 && (f = f.replace(":", "")), f = parseInt(f) - 100, u >= l && c <= f) {
                                        if ("今天" == p[e] && u - a < 30) continue;
                                        n.push(m[d])
                                    }
                                } else if (u >= l) {
                                    if ("今天" == p[e] && u - a < 30) continue;
                                    n.push(m[d])
                                }
                            }
                        }
                    var y = JSON.parse(t.page.getStorage("orderFormInfo"));
                    if (y.hasOwnProperty("pickupDate")) {
                        if ("init" == i) {
                            var v = o.formInfo.pickupDate,
                                T = v.substring(0, v.indexOf("__")),
                                D = v.substring(v.indexOf("__") + 2);
                            T != p[0] ? g.sessionPickupDate(n) : D != n[0] && g.sessionPickupDate(n)
                        }
                    } else g.sessionPickupDate(n);
                    return n
                }
            },
            sessionPickupDate: function (t) {
                "今天" == p[0] && "" == p[0], o.formInfo.pickupDate = p[0] + "__" + t[0], o.formFromTo.pickupDate = p[0] + "__" + t[0];
                var i = p[0] + t[0];
                "今天" == p[0] && (i = t[0]), e(".form-from-to .pickup-date").find("p.right").text(i), o.formInfo.save()
            },
            sysDatebusinessDay: function () {
                var e = g.serviceTM;
                p.length = 0, e < 2359 && p.push("今天"), p.push("明天"), p.push("后天"), g.daylist = p
            },
            sysDatebusinessTime: function (e) {
                var t = g.serviceTM,
                    i = new Array;
                if ("" != p[e]) {
                    "今天" == p[e] && i.push("一小时内");
                    for (var a = 0; a < m.length; a++) {
                        var n = m[a].substring(0, m[a].indexOf("~")),
                            r = m[a].substring(m[a].indexOf("~") + 1),
                            n = g.resTime(n),
                            r = g.resTime(r);
                        r <= 0 || "今天" == p[e] && n - t < 30 || i.push(m[a])
                    }
                    return i
                }
            },
            resTime: function (e) {
                return e = parseInt(e.replace(":", ""))
            }
        },
        f = {
            init: function () {
                function i() {
                    var e = {
                        isPilotGray: o.params.isPilotGray,
                        isQualificFlg: o.params.isQualificFlg
                    };
                    t.page.setStorage("pilotGray", JSON.stringify(e))
                }
                e(".pickup-date").removeClass("hide"), e("body").addClass("page-new-sending"), e("#titName").text("快递员上门"), o.formFromTo.bindClick("sending", o.editOrderDetail.savaSession);
                var a = t.page.getUrlParm("from");
                "address" != a ? (t.mutual.tipsLoading("检查登录状态"), t.login.isLogin(function (t) {
                    t ? o.initOrderDetail.queryIsPilotGray(function () {
                        o.params.isPilotGray ? (o.params.isQualificFlg && (o.editOrderDetail.payment = "10"), e(".terms").removeClass("hide"), e("#submitBtn").removeClass("hide").text("下单")) : e("#selnowPointId").css("bottom", "12rem"), o.params.isPilotGray && o.params.isQualificFlg && "1" == o.editOrderDetail.payment && (o.editOrderDetail.payment = "10"), f.getForm(), o.initOrderDetail.payway(o.editOrderDetail.payment), i()
                    }) : (f.getForm(), e("#selnowPointId").css("bottom", "12rem"), o.initOrderDetail.payway(o.editOrderDetail.payment)), o.editOrderDetail.getSession(), o.initOrderDetail.cargo(o.editOrderDetail.cargo_name, o.editOrderDetail.metaWeight), o.initOrderDetail.insurance(o.editOrderDetail.insurancePrice, o.editOrderDetail.insuranceValueRelevance)
                })) : (f.getForm(), o.editOrderDetail.getSession(), o.params.isPilotGray ? (e(".terms").removeClass("hide"), e("#submitBtn").removeClass("hide").text("下单")) : e("#selnowPointId").css("bottom", "12rem"), o.initOrderDetail.payway(o.editOrderDetail.payment), o.initOrderDetail.cargo(o.editOrderDetail.cargo_name, o.editOrderDetail.metaWeight), o.initOrderDetail.insurance(o.editOrderDetail.insurancePrice, o.editOrderDetail.insuranceValueRelevance))
            },
            getForm: function () {
                var e = t.page.getUrlParm("from");
                if ("address" == e) {
                    var i = t.page.getStorage("pilotGray");
                    if (i) {
                        var a = JSON.parse(i);
                        o.params.isPilotGray = a.isPilotGray, o.params.isQualificFlg = a.isQualificFlg
                    }
                    var n = JSON.parse(t.page.getStorage("orderFormInfo"));
                    n ? (o.formFromTo.update(u), g._queryDay(), g._queryTime(0, "init"), o.formInfo.queryProductInfo(o.formInfo, "", u)) : o.formFromTo.update(u, l.querySendAddress)
                } else "ReappearOrder" == e ? (o.formFromTo.update(u), g._queryDay(), g._queryTime(0, "init"), o.formInfo.queryProductInfo(o.formInfo, "", u)) : (o.formFromTo.update(u, l.querySendAddress), t.order.CNYFee())
            }
        },
        y = {
            selAppointInfo: function (e) {
                var a = t.mutual.footerFix("contact", "预约人信息"),
                    n = JSON.parse(t.page.getStorage("appointSession"));
                n && (a.user.val(n.appointName), a.tel.val(n.appointTel)), a.user.focus(function () {
                    e.addClass("inputting")
                }).blur(function () {
                    e.removeClass("inputting")
                }).on("input", function () {
                    var e = this;
                    setTimeout(function () {
                        i.check.isSpecialStr(e)
                    }, 100)
                }), a.tel.focus(function () {
                    e.addClass("inputting")
                }).blur(function () {
                    e.removeClass("inputting")
                }).on("input", function () {
                    i.check.isPhoneTel(a.tel)
                }), a.btn.on("click", function () {
                    if ("" == a.user.val()) return void t.mutual.tipsDialog("预约人姓名记得填写哦");
                    if ("" == a.tel.val()) return void t.mutual.tipsDialog("预约人电话记得填写哦");
                    var e = {
                        appointName: a.user.val(),
                        appointTel: a.tel.val()
                    };
                    t.page.setStorage("appointSession", JSON.stringify(e)), a.close()
                }), a.clos.on("click", function () {
                    a.close()
                })
            },
            selBusinessTime: function (e) {
                g._queryDay();
                var i = {};
                if (!o.formInfo.sendingAddress) return void t.mutual.tipsDialog("请先选择寄件地址哦~");
                i = g._queryTime(0, "click");
                var a = g.daylist,
                    n = {
                        init: i,
                        returnList: function (e) {
                            var t = {};
                            return t = o.formInfo.sendingAddress ? g._queryTime(e, "huadong") : g.sysDatebusinessTime(e)
                        }
                    },
                    r = o.formInfo.pickupDate,
                    s = "",
                    d = "";
                r && (s = r.substring(0, r.indexOf("__")), d = r.substring(r.indexOf("__") + 2)), t.order.selector("上门时间", "double", 3, a, n, function (t, i) {
                    (t || i) && (o.formInfo.pickupDate = t + "__" + i, "一小时内" == i && (t = ""), "今天" == t && (t = ""), e.find("p.right").text(t + i), o.formFromTo.pickupDate = t + "__" + i, o.formInfo.save(), o.formInfo.queryProductInfo(o.formInfo, "nomap", u), o.sending_ctly.bussTM_clty(t + i))
                }, s, d)
            }
        };
    e(function () {
        o.setCacheInfo.cacheLegalRisk(), f.init();
        var i = t.page.getStorage("appointSession");
        i && (e("#appointInfo").removeClass("hide"), e("#appointInfo").on("click", function () {
            y.selAppointInfo(e(this))
        })), o.formFromTo.from.pickupFrom.on("click", function () {
            y.selBusinessTime(e(this))
        }), e(".page-sending").on("click", ".userBoxTip", function () {
            var t = e(this);
            return t.hasClass("hideBoxTip") ? (t.removeClass("hideBoxTip"), s(), !1) : void(window.location.href = "/cx/query/nearby-store.html?source=reservation-code&FCCode=5&t=" + (new Date).getTime())
        }), e(".success-animation").on("click", ".close", function () {
            window.location.href = "/cx/order/order-detail.html?from=sending&appointmentNo=" + g.appointmentNo + "&t=" + (new Date).getTime(), e(".success-animation").fadeOut()
        }), e("#selnowPointId").on("click", function () {
            var e = o.formInfo.sendingAddress,
                t = o.formInfo.receivingAddress;
            e || t ? o.mapoper.tracingPoint(e, t, u) : o.mapoper.getPosition("", u)
        }), e("#submitBtn").off("click").on("click", function () {
            u()
        }), e("window").on("unload", function () {
            o.sending_ctly.isCloseCountly && r.end()
        })
    })
});
//# sourceMappingURL=sending.js.map