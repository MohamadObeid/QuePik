const { toComponent } = require("../method/toComponent")

const Upload = (component) => {

    component = toComponent(component)
    var { upload } = component

    upload.multiple = upload.multiple !== undefined ? upload.multiple : true

    return {
        ...component,
        type: 'View',
        class: `file-drop-area ${component.class || ''}`,
        children: [{
            type: `Icon?icon.name=${upload.type === 'image' ? 'images' : upload.type === 'video' ? 'camera-video' : ''}`,
            style: {
                fontSize: '2.5rem',
                color: '#444',
                marginRight: '1rem'
            }
        }, {
            type: `Text?class=file-msg;text=or drag and drop ${upload.type}s here`
        }, {
            type: `Input?class=file-input;upload.type=${upload.type};upload.multiple=${upload.multiple};upload.accept=${upload.accept};style.height=100%`
        }]
    }
}

module.exports = {Upload}