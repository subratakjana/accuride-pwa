const addDynamicScript = (script, id) => {
    const code = script;
    const scriptTag = document.createElement('script');
    scriptTag.setAttribute('type', 'text/javascript');
    if (id) scriptTag.id = id;
    scriptTag.appendChild(document.createTextNode(code));
    document.body.appendChild(scriptTag);
};

export const removeDynamicScript = (removeScriptID) => {
    const removeObj = document.getElementById(removeScriptID);
    if (removeObj) removeObj.remove();
};

export const addDynamicScriptMin = (src, id) => {
    removeDynamicScript(id);
    const scriptTag = document.createElement('script');
    scriptTag.setAttribute('type', 'text/javascript');
    if (id) scriptTag.id = id;
    scriptTag.src = src;
    document.head.appendChild(scriptTag);
};


export default addDynamicScript;
