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
                `<div class="form-group flex items-center" style="padding:10px;">
                    <label class="mr-3 flex-grow">${k.replace(/_/g, " ")}</label>
                    <input class="generated-input flex-grow shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="${address}" value='${obj[k] == null ? "" : obj[k]}' />
                </div>`
            );
        }
    })
    return res;
}

const getObjectItem = (object = {}, address = "", defaultValue = null) => {
    const components = address.split(".");
    if(components.length === 1) {
        let component = components[0];
        let value = object[component];
        return value || defaultValue;
    }
    return getObjectItem(object[components[0]], components.slice(1).join("."), defaultValue)
}

const setObjectItem = (object = {}, address = "", value = null) => {
    const components = address.split(".");
    if(components.length === 1) {
        return { ...object || {}, [components[0]]: value }
    }
    const parent = components[0];
    let childElement = setObjectItem(object[parent]) ? object[parent] : {}
    object[parent] = setObjectItem(childElement, components.slice(1).join("."), value)
    return object;
}

validateJsonValue = function(value) {
    let parsedStr = JSON.stringify(value);
     parsedStr = parsedStr.replaceAll(/\\"#|#\\"/g, "")
    return JSON.parse(JSON.parse(parsedStr));
}

renderJsonPreview = function(preview, input, syncInput, submitBtn) {
    const errorClasses = "bg-red-500 text-white"
    try {
        if(input.val()) {
            let json = {
                [input.attr('name')]: validateJsonValue(input.val())
            }
            preview.html(genInput(json));
            if(syncInput) {
                preview.on('input', 'input.generated-input', function(e) {
                    json = setObjectItem(json, $(this).attr("name"), $(this).val());
                    input.val(JSON.stringify(json[input.attr('name')]))
                })
            }
        } else {
            preview.html("Empty data");
        }
        preview.removeClass(errorClasses);
        if(submitBtn) submitBtn.removeAttr("disabled");
    } catch (e) {
        preview.addClass(errorClasses);
        preview.html("Invalid data, please check");
        if(submitBtn) submitBtn.attr("disabled", true);
    }
}

setConfigureButton = function(field) {
    const textarea = field.find("textarea");
    const button = field.find(".configure-btn")
    if(field.attr("sample") && !textarea.val()) {
        button.removeClass("hidden");
    } else{
        button.addClass("hidden");
    }
}

$(document).ready(function () {
    $(".has-json-validation").each(function() {
        const form = $(this);
        const submit = form.find("[type='submit']");
        form.find(".validate-json").each(function() {
            const field = $(this);
            const jsonPreview = $("<div>").attr("class", "json-preview bg-gray-100 rounded-lg p-5 my-1");
            field.append(jsonPreview);
            const configureBtn = $("<button>")
                .attr("type", "button")
                .attr("class", "configure-btn bg-gray-500 text-white py-1 px-2 rounded my-1 hidden").
                html("Configure");
            const textarea = $(this).find("textarea");
            configureBtn.on("click", function(){
                textarea.val(field.attr("sample"));
                renderJsonPreview(jsonPreview, textarea , field.attr("sync-input"), submit);
                setConfigureButton(field)
            })
            field.append(configureBtn);
            renderJsonPreview(jsonPreview, textarea, field.attr("sync-input"), submit)
            setConfigureButton(field)
            field.on('input', 'textarea', function(e) {
                renderJsonPreview(jsonPreview, $(this) , field.attr("sync-input"), submit);
                setConfigureButton(field)
            })
        })
    })
})
