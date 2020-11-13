const HtmlWebpackPlugin = require('html-webpack-plugin')
const { type } = require('os')
const { resolve } = require('path')
const { compilation } = require('webpack')
class HtmlAddAttrPlugins {
    constructor(options = {}) {
        this.options = options
    }

    addAttr (tag, key, val) {
        if (!tag || !tag.length) return
        tag.forEach((tag, index) => {
            let value = val
            if (typeof val === 'function') {
                value = val(tag, compilation, index)
            }
            !tag.attributes && (tag.attributes = {})
            tag.attributes[key] = value
        })
    }
    apply (compiler) {
        let _self = this
        compiler.hooks.compilation.tap('htmlPlugin', compilation => {
            HtmlWebpackPlugin.getHooks(compilation).alterAssetTagGroup.tapAysnc('htmlPlugin',
                (data, cb) => {
                    let options = Object.assign({}, null, _self.options.attributes)
                    Object.keys(options).forEach((key) => {
                        let val = options[key]
                        if (typeof value != "string" && typeof value != 'function') return
                        _self.addAttr(data.headTags, key, value)
                        _self.addAttr(data.bodyTags, key, value)
                    })
                    if (typeof cb === 'function') {
                        cb(null, data)
                    } else {
                        return new Promise(resolve => resolve(data))
                    }
                })
        })
    }
}