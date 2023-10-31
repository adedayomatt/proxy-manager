const genInput = (obj, res = [], parent = null) => {
    Object.keys(obj).forEach(function(k) {
        let address = parent ? parent + '.' + k : k;
        let content = []
        if (obj[k] instanceof Object) {
            res.push('<label style="margin: 10px 0">'+k.replace(/_/g, " ")+'</label>'+
                '<div style="padding-left: 30px; border-left: 2px dotted gray "" >'+genInput(obj[k], content, address).join("")+'</div>');
        }
        else if (obj[k] instanceof Array) {
            obj[k].forEach((el, i) => {
                content.push(genInput(el, content, address+'['+i+']').join(""))
            })
            res.push(
                '<label style="margin: 10px 0">'+k.replace(/_/g, " ")+'</label>' +
                '<div style="padding-left: 30px; >'+content.join("")+'</div>'
            )
        }
        else {
            res.push(
                `<div class="form-group" style="padding:10px;">
                    <label>${k.replace(/_/g, " ")}</label>
                    <input class="shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="${address}" value="${obj[k] == null ? "" : obj[k]}" />
                </div>`
            );
        }
    })
    return res;
}

validateJsonValue = function(value) {
    let parsedStr = JSON.stringify(value);
    parsedStr = parsedStr.replaceAll(/\\"#|#\\"/g, "")
    return JSON.parse(JSON.parse(parsedStr));
}

renderJsonPreview = function(preview, value, submitBtn) {
    const errorClasses = "bg-red-500 text-white"
    try {
        if(value) {
            const json = validateJsonValue(value);
            preview.html(genInput(json));
        } else {
            preview.html("Empty data");
        }
        preview.removeClass(errorClasses);
        if(submitBtn) submitBtn.removeAttr("disabled")
    } catch (e) {
        preview.addClass(errorClasses);
        preview.html("Invalid data, please check");
        if(submitBtn) submitBtn.attr("disabled", true);
    }
}

$(document).ready(function () {
    $("form.has-json-validation").each(function() {
        const form = $(this);
        const submit = form.find("[type='submit']");
        form.find(".validate-json").each(function() {
            const field = $(this);
            const jsonPreview = $("<div>").attr("class", "json-preview bg-gray-100 rounded-lg p-5");
            field.append(jsonPreview);
            const textarea = $(this).find("textarea");
            renderJsonPreview(jsonPreview, textarea.val())
            field.on('input', 'textarea', function(e) {
                renderJsonPreview(jsonPreview,$(this).val(), submit)
            })
        })
    })
})
