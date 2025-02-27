<template>
    <div>
        <fabric-canvas style="border: solid 1px #CCCCCC;" :width="parseInt(image.settings.width)" :height="parseInt(image.settings.height)" :background-color="image.settings.background_color" :dirty="false" @canvas-updated="updateCanvas">
            <span :id="'fabric-images'" v-for="(item, index) in image.settings.image_elements" :key="'image-' + index">
                <fabric-image
                    :id="'image' + index" v-if="item.url_base64 && !item.hidden"
                    :url="item.url_base64"
                    :width.sync="item.width"
                    :height.sync="item.height"
                    :top.sync="item.top"
                    :left.sync="item.left"
                    :scale-x.sync="item.scaleX"
                    :scale-y.sync="item.scaleY"
                    v-model="image.settings.image_elements[index]"
                    @moved="$parent.elementMoved(item)"
                    @selected="$parent.selectElement(index, item)"
                    @deselected="$parent.unselectElement()"
                    :selectable="preview != 1"
                ></fabric-image>
            </span>

            <span :id="'fabric-websites'" v-for="(item, index) in image.settings.website_elements" :key="'website-' + index">
                <fabric-image
                    :id="'website' + index" v-if="item.url_base64 && !item.hidden"
                    :url="((preview == 1) ? business.website_screenshot_base64 : item.url_base64)"
                    :width.sync="item.width"
                    :height.sync="item.height"
                    :top.sync="item.top"
                    :left.sync="item.left"
                    :scale-x.sync="item.scaleX"
                    :scale-y.sync="item.scaleY"
                    v-model="image.settings.image_elements[index]"
                    @moved="$parent.elementMoved(item)"
                    @selected="$parent.selectElement(index, item)"
                    @deselected="$parent.unselectElement()"
                ></fabric-image>
            </span>

            <span :id="'fabric-texts'" v-for="(item, index) in image.settings.text_elements" :key="'atext-' + index">
                <fabric-text 
                    v-if="!item.hidden"
                    :id="'atext-' + index" :text="item.text"
                    v-model="image.settings.text_elements[index]"
                    :fill="item.color"
                    :font-family="item.font_family.replace(' (Google)', '')"
                    :font-style="item.font_style"
                    :top.sync="item.top"
                    :left.sync="item.left"
                    :scale-x.sync="item.scaleX"
                    :scale-y.sync="item.scaleY"
                    @moved="$parent.elementMoved(item)"
                    :font-weight="item.font_weight"
                    :font-size="parseInt(item.font_size)"
                    @selected="$parent.selectElement(index, item)"
                    @deselected="$parent.unselectElement()"
                ></fabric-text>
            </span>
        </fabric-canvas>

        <!-- <v-btn @click="clearSelection()">Clear Selection</v-btn> -->
    </div>
</template>

<script>
import vueFabricWrapper from "vue-fabric-wrapper";

export default {
    props: ['image', 'preview', 'business'],
    data: function() {
        return {
            canvas: null,
            canvProc: null
        }
    },

    components: {
        FabricCanvas: vueFabricWrapper.FabricCanvas,
        FabricText: vueFabricWrapper.FabricText,
        FabricCircle: vueFabricWrapper.FabricCircle,
        FabricGroup: vueFabricWrapper.FabricGroup,
        FabricImage: vueFabricWrapper.FabricImageFromURL,
    },

    methods: {
        updateCanvas(e) {
            this.canvas = e;
        },
        clearSelection() {
            this.canvas.discardActiveObject().renderAll();
        }
    },

    watch: {
		'image': {
			handler() {
				console.log('changes made')
			}
		}
    },

    created() {
        let self = this;
        if (!this.canvProc) {
            this.canvProc = setInterval(function() {
                let obj = self.canvas.getObjects();

                obj.forEach(function(item, i) {
                    if (item.id.indexOf("text") != '-1')
                        self.canvas.bringToFront(item)
                });

                self.canvas.renderAll();
            }, 500);
        }

        if (self.preview) {
            const img = new Image();
            img.onload = function() {
                console.log('loaded');
                let self2 = this;
                setTimeout(function() {
                    let obj = self.canvas.getObjects();

                    obj.forEach(function(item, i) {
                        if (item.id.indexOf("website") != '-1') {
                            let scalex = item.width/self2.width;
                            let scaley = item.height/self2.height;

                            console.log('scalex', scalex);
                            console.log('scaley', scaley);

                            item.width = self2.width;
                            item.height = self2.height;

                            item.scaleX = scalex;
                            item.scaleY = scaley;
                        }
                    });
                    
                    self.canvas.renderAll();
                }, 300);
            }
            img.src = self.business.website_screenshot;
        }
    },

    destroyed() {
        clearInterval(this.canvProc);
        this.canvProc = null;
    }
}
</script>