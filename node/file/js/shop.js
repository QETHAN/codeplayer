/**
 * Created by QETHAN on 14-2-24.
 */
;(function ($) {
    $('#camera_wrap_1').camera({
        height: '400px',
        loader: 'bar',
        pagination: false,
        thumbnails: true
    });
    $('#camera_wrap_2').camera({
        height: '400px',
        loader: 'bar',
        pagination: false,
        thumbnails: true
    });
    function getTop(e) {
        var offset = e.offsetTop;
        if (e.offsetParent != null) offset += getTop(e.offsetParent);
        return offset;
    }

    var obj = document.getElementById('shop-nav');
    var top = getTop(obj);
    var bodyScrollTop = 0;
    window.onscroll = function () {
        bodyScrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        if (bodyScrollTop > top) {
            /*当窗口的滚动高度大于浮动层距离窗口顶部的距离时，也就是原理中说的第一种情况
             *我们把这个浮动层position值设为fixed，top值设为0px，让它定位在窗口顶部*/
            obj.style.position = "fixed";
            obj.style.top = "0px";
            obj.style.marginTop = "0px";
            obj.style.backgroundColor = '#fff';
            obj.style.zIndex = 10;
            obj.style.cssText += "-webkit-box-shadow: rgba(0, 0, 0, 0.3) 0px 2px 1px;-moz-box-shadow: rgba(0, 0, 0, 0.3) 0px 2px 1px;box-shadow: rgba(0, 0, 0, 0.3) 0px 2px 1px;"
        } else {
            /*当窗口的滚动高度小于浮动层距离窗口顶部的距离时，也就是原理中说的第一种情况
             *我们把这个浮动层position值设为static或为空，让它回归文档流
             *让它回到原来的位置上去*/
            obj.style.cssText = "";
            obj.style.position = "static";
            obj.style.marginTop = '30px';
        }
    };
    //获取省市地区数据
    var province = document.getElementById('province'),
        provinceTpl = Handlebars.compile(document.getElementById('province-tpl').innerHTML);

    var subRegion1 = document.getElementById('subRegion1'),
        subRegion2 = document.getElementById('subRegion2'),
        subRegionTpl = Handlebars.compile(document.getElementById('sub-option-tpl').innerHTML);

    var nameEle = document.getElementById('name'),
        cellphoneEle = document.getElementById('cellphone'),
        telephoneEle = document.getElementById('telephone'),
        provinceEle = document.getElementById('province'),
        cityEle = document.getElementById('subRegion1'),
        areaEle = document.getElementById('subRegion2'),
        addressEle = document.getElementById('address'),
        oc_idEle = document.getElementById('oc_id'),
        countEle = document.getElementById('count'),
        total_accountEle = document.getElementById('total_account'),
        c_remarkEle = document.getElementById('c_remark'),
        fromEle = document.getElementById('from'),
        errorlis = document.getElementById('form-error').querySelectorAll('li'),
        errorlisLen = errorlis.length,
        cancelbuys = document.querySelectorAll('.cancelbuy'),
        formData = null;

    $.get(app.DU + app.DI.queryProvince, function (data) {
        var data = JSON.parse(data);
        var html = provinceTpl(data);
        province.innerHTML = html;
        pullSubRegionData(data.province[0].region_id);
    });

    //获取省直辖市 子地区数据
    function pullSubRegionData(pid) {
        $.get(app.DU + app.DI.querySubRegion + pid, function (data) {
            var data = JSON.parse(data);
            var html = subRegionTpl(data);
            subRegion1.innerHTML = html;
            $.get(app.DU + app.DI.querySubRegion + data.sub_region[0].region_id, function (data) {
                var data = JSON.parse(data);
                if (data.sub_region.length == 0) {
                    subRegion2.parentNode.style.display = 'none';
                } else {
                    subRegion2.parentNode.style.display = '';
                    var html = subRegionTpl(data);
                    subRegion2.innerHTML = html;
                }
            });
        });
    }

    //省市级联动
    province.onchange = function () {
        pullSubRegionData(this.options[this.selectedIndex].getAttribute('data-id'));
    }
    subRegion1.onchange = function () {
        $.get(app.DU + app.DI.querySubRegion + this.options[this.selectedIndex].getAttribute('data-id'), function (data) {
            var data = JSON.parse(data);
            if (data.sub_region.length == 0) {
                subRegion2.style.display = 'none';
            } else {
                subRegion2.style.display = '';
                var html = subRegionTpl(data);
                subRegion2.innerHTML = html;
            }
        });
    }

    //提交购买表单
    var buyform = document.getElementById('buyform'),
        name_error = document.getElementById('name-error'),
        phone_error = document.getElementById('phone-error'),
        address_error = document.getElementById('address-error'),
        addOrderBtn = document.getElementById('addOrder'),
        confirmModal = document.getElementById('confirmModal'),
        confirm = document.getElementById('confirm'),
        success = document.getElementById('success'),
        fail = document.getElementById('fail'),
        confirmHeader = document.getElementById('confirm-header'),
        confirmCmcEle = document.getElementById('confirm-cmc'),
        successCmcEle = document.getElementById('success-cmc'),
        failCmcEle = document.getElementById('fail-cmc'),
        confirmbuy = document.getElementById('confirmbuy'),
        addConfirmTpl = Handlebars.compile(document.getElementById('addConfirm-tpl').innerHTML),
        confirmAction = document.getElementById('confirmAction'),
        htmlData = null,
        successTitle = document.getElementById('success-title'),
        successMsg = document.getElementById('success-msg');

    function addOrder() {
        var name = nameEle.value,
            cellphone = cellphoneEle.value,
            telephone = telephoneEle.value,
            province = provinceEle.value,
            city = cityEle.value,
            area = areaEle.value,
            address = addressEle.value,
            oc_id = oc_idEle.value,
            count = countEle.value,
            total_account = total_accountEle.textContent,
            c_remark = c_remarkEle.value,
            from = fromEle.value;

        if (name.replace(/^(\s+)|(\s+)$/g, '').length == 0) {
            for (var i = 0; i < errorlisLen; i++) {
                errorlis[i].style.display = 'none';
            }
            name_error.style.display = 'block';
            return;
        } else if (cellphone.replace(/^(\s+)|(\s+)$/g, '').length == 0) {
            for (var i = 0; i < errorlisLen; i++) {
                errorlis[i].style.display = 'none';
            }
            phone_error.style.display = 'block';
            return;
        } else if (address.replace(/^(\s+)|(\s+)$/g, '').length == 0) {
            for (var i = 0; i < errorlisLen; i++) {
                errorlis[i].style.display = 'none';
            }
            address_error.style.display = 'block';
            return;
        }
        for (var i = 0; i < errorlisLen; i++) {
            errorlis[i].style.display = 'none';
        }

        if(subRegion2.parentNode.style.display == 'none'){
            area = '';
        }
        formData = {
            name: name,
            cellphone: cellphone,
            telephone: telephone,
            province: province,
            city: city,
            area: area,
            address: address,
            oc_id: oc_id,
            count: count,
            total_account: parseInt(count,10)*39.5,
            c_remark: c_remark,
            from: from};

        //遮罩确认
        confirmModal.style.display = 'block';
        confirm.style.display = 'block';
        confirm.className += ' cmc-show';
        confirmHeader.textContent = '确认订单';
        htmlData = addConfirmTpl(formData);
        confirmCmcEle.innerHTML = htmlData;
//        document.documentElement.style.overflow = 'hidden';
        disable_scroll();
        document.documentElement.scrollTop = bodyScrollTop;
    };
    addOrderBtn.onclick = function () {
        addOrder();
    }

    function clearForm() {
        count.selectedIndex = 0;
        total_account.textContent = '79元';
        nameEle.value = '';
        cellphoneEle.value = '';
        telephoneEle.value = '';
        addressEle.value = '';
        c_remarkEle.value = '';
    }

    for(var i=0;i<cancelbuys.length;i++){
        //取消订单
        cancelbuys[i].onclick = function () {
            confirmModal.style.display = 'none';
            confirm.classList.remove('cmc-show');
            success.classList.remove('cmc-show');
            fail.classList.remove('cmc-show');
            confirm.classList.remove('cmc-hide');
            success.classList.remove('cmc-hide');
            fail.classList.remove('cmc-hide');
            successTitle.textContent = '提交成功';
            successMsg.textContent = '订单提交成功，订单号、售后联系方式稍后短信通知你 ~';
            confirmbuy.removeAttribute('disabled');
//            document.documentElement.style.overflow = 'visible';
            enable_scroll();
        }
    }

    confirmbuy.onclick = function () {
        confirmHeader.textContent = '订单提交中...'
        confirmbuy.setAttribute('disabled','disabled');
        $.post(app.DU + app.DI.addOrder, formData, function (data) {
            var data = JSON.parse(data);
            if (data.order_num) {
                confirm.classList.remove('cmc-show');
                confirm.classList.add('cmc-hide');

                successCmcEle.innerHTML = htmlData;
                successTitle.textContent = '提交成功';
                successMsg.textContent = '订单提交成功，订单号、售后联系方式稍后短信通知你 ~';
                success.classList.add('cmc-show');
                clearForm();
            } else {
                confirm.classList.remove('cmc-show');
                confirm.classList.add('cmc-hide');

                successCmcEle.innerHTML = htmlData;
                successTitle.textContent = '库存不足';
                successMsg.textContent = '这批咖啡已经被吃货们买完了，下一批到货挑嘴师会通知你哒 ~';
                success.classList.add('cmc-show');
                clearForm();
            }
        }).fail(function(){
            confirm.classList.remove('cmc-show');
            confirm.classList.add('cmc-hide');

            failCmcEle.innerHTML = htmlData;
            fail.classList.add('cmc-show');
        });
    }

    // left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
    var keys = [37, 38, 39, 40];

    function preventDefault(e) {
        e = e || window.event;
        if (e.preventDefault)
            e.preventDefault();
        e.returnValue = false;
    }

    function keydown(e) {
        for (var i = keys.length; i--;) {
            if (e.keyCode === keys[i]) {
                preventDefault(e);
                return;
            }
        }
    }

    function wheel(e) {
        preventDefault(e);
    }

    function disable_scroll() {
        if (window.addEventListener) {
            window.addEventListener('DOMMouseScroll', wheel, false);
        }
        window.onmousewheel = document.onmousewheel = wheel;
        document.onkeydown = keydown;
    }

    function enable_scroll() {
        if (window.removeEventListener) {
            window.removeEventListener('DOMMouseScroll', wheel, false);
        }
        window.onmousewheel = document.onmousewheel = document.onkeydown = null;
    }

    console.log('------------>'+app.DU);
})(jQuery);