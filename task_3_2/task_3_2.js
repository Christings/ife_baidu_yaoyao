/**
 * Created by Administrator on 2017/5/5.
 */
window.onload=function () {

    //使用codePointAt来判断是否为中文字符
    function is32Bit(c) {
        return c.codePointAt(0) > 0xFF;
    }
//计算字符串长度
    function calculate(str) {
        var ennum = 0;
        var zhnum = 0;
        for (var ch in str) {
            if (is32Bit(ch)) {
                zhnum += 1;
            } else {
                ennum += 1;
            }
        }
        return zhnum * 2 + ennum;
    }
//检验字符串长度是否在4-16
    function stringValidate(inputBox) {
        var inputValue = inputBox.value;
        if (inputValue.length < 1) {
            return 0;
        }
        var strLength = calculate(inputValue);
        return strLength >= 4 && strLength <= 16 ? true : false;
    }
//改变颜色
    function changeColor(node, color) {
        var element = document.getElementById(node);
        var element_help = document.getElementById(node + "_help");
        element.style.color = color;
        element.style.borderColor = color;
        element_help.style.color = color;
    }
//名称和密码校验
    var inputBoxFlag;
    function validate(node, type) {
        //node必须是字符串
        var inputBox = document.getElementById(node);
        var inputBox_help = document.getElementById(node + "_help");
        var flag = stringValidate(inputBox);
        inputBox_help.style.visibility = "visible";
        if (flag === 0) {
            inputBox_help.innerText = type + "不能为空";
            changeColor(node, "#f00");
            inputBoxFlag = false;
            return inputBoxFlag;
        } else if (flag === true) {
            inputBox_help.innerText = type + "格式正确";
            changeColor(node, "#0f0");
            inputBoxFlag = true;
            return inputBoxFlag;
        } else {
            inputBox_help.innerText = type + "格式错误";
            changeColor(node, "#f00");
            inputBoxFlag = false;
            return inputBoxFlag;
        }
    }
//检验两次密码是否一致
    function validatePassword() {
        var passwordValue = document.getElementById("password").value;
        var repasswordValue = document.getElementById("re-password").value;
        if(passwordValue.length<1){
            return 0;
        }
        return passwordValue===repasswordValue;
    }
//验证邮箱
    function isEmail(str) {
        if(str.length<1){
            return 0;
        }
        var reg= /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
        return reg.test(str);
    }
//验证手机
    function isPhone(str) {
        if(str.length<1){
            return 0;
        }
        var reg=/^1(3|4|5|7|8)[0-9]\d{8}$/g;
        return reg.test(str);
    }
    var nameFlag;
    var passwordFlag;
    var repasswordFlag;
    var emailFlag;
    var phoneFlag;
        var name=document.getElementById("name");
        var name_help=document.getElementById("name_help");
        name.addEventListener("focus",function () {
            name_help.style.visibility="visible";
        });
        name.addEventListener("blur",function () {
            validate("name","名称");
            nameFlag=validate("name","名称");
        });

        var password=document.getElementById("password");
        var password_help=document.getElementById("password_help");
        password.addEventListener("focus",function () {
            password_help.style.visibility="visible";
        });
        password.addEventListener("blur",function () {
            validate("password","密码");
            passwordFlag=validate("password","密码");
        });

        var repassword=document.getElementById("re-password");
        var repassword_help=document.getElementById("re-password_help");
        repassword.addEventListener("focus",function () {
            repassword_help.style.visibility="visible";
        });
        repassword.addEventListener("blur",function () {
            var flag=validatePassword();
            repassword_help.style.visibility="visible";
            if (flag === 0) {
                repassword_help.innerText = '密码不能为空';
                changeColor('repassword', '#f00');
                repasswordFlag = false;
            } else if (flag === true) {
                repassword_help.innerText = '密码输入一致';
                changeColor('repassword', '#0f0');
                repasswordFlag = true;
            } else {
                repassword_help.innerText = '两次密码输入不一致';
                changeColor('repassword', '#f00');
                repasswordFlag = false;
            }
        });


        var email=document.getElementById("email");
        var email_help=document.getElementById("email_help");
        email.addEventListener("focus",function () {
            email_help.style.visibility="visible";
        });
        email.addEventListener("blur",function () {
            var emailValue=email.value;
            var flag=isEmail(emailValue);
            email_help.style.visibility="visible";
            if (flag) {
                email_help.innerText = '邮箱格式正确';
                changeColor('email', '#0f0');
                emailFlag = true;
            } else {
                email_help.innerText = '邮箱格式不正确';
                changeColor('email', '#f00');
                emailFlag = false;
            }
        });

        var phone=document.getElementById("phone");
        var phone_help=document.getElementById("phone_help");
        phone.addEventListener("focus",function () {
            email_help.style.visibility="visible";
        });
        phone.addEventListener("blur",function () {
            var phoneValue=phone.value;
            var flag=isPhone(phoneValue);
            phone_help.style.visibility="visible";
            if (flag===0) {
                phone_help.innerText = '手机号不能为空';
                changeColor('phone', '#f00');
                phoneFlag = false;
            } else if(flag===true){
                phone_help.innerText = '手机号格式正确';
                changeColor('phone', '#0f0');
                phoneFlag = true;
            }else {
                phone_help.innerText = '手机号格式不正确';
                changeColor('phone', '#f00');
                phoneFlag = false;
            }
        });

        var submit=document.getElementById("submit");
        submit.addEventListener("click",function () {
            if (!(nameFlag && passwordFlag && repasswordFlag && emailFlag && phoneFlag)) {
                alert('输入有误');
            }
        });
};

