const textInput = {
    props: {
        field: { 
            required: true 
        },
        data: { 
            required: true 
        }
    },
    template: `
        <div class="wrap-input">
            <input type="text" :placeholder="field.placeholder" :class="data.error.isActive ? 'error': '' " v-model="data.value">
            <span class="focus-input"></span>
            <div v-if="data.error != null">
                <label v-if="data.error.isActive" class="error">
                    <i class="icon-x"></i>
                    {{data.error.message}}
                </label>
            </div>
        </div>
    `
};

const passwordInput = {
    props: {
        field: { 
            required: true 
        },
        data: { 
            required: true 
        }
    },
    template: `
        <div class="wrap-input">
            <input type="password" :placeholder="field.placeholder" :class="data.error.isActive ? 'error': '' " v-model="data.value">
            <span class="focus-input"></span>
            <div v-if="data.error != null">
                <label v-if="data.error.isActive" class="error">
                    <i class="icon-x"></i>
                    {{data.error.message}}
                </label>
            </div>
        </div>
    `
};

const numberInput = {
    props: {
        field: { 
            required: true 
        },
        data: { 
            required: true 
        }
    },
    components:{
        'rounded-button':roundedButton
    },
    methods: {
        increment(){
            this.$emit('increment',this.data);
        },
        decrement(){
            this.$emit('decrement');
            console.log('Increment button clicked for ID: JMVM');
        }
    },
    data() {
        return {
            buttonIncrement:{
                type:'roundend-button',
                content:'+',
                typeButton:'button',
                align:'',
                size:'md'
            },
            buttonDecrement:{
                type:'roundend-button',
                content:'-',
                typeButton:'button',
                align:'',
                size:'md'
            }
        }
    },
    template: `
        <div class="wrap-input-number">
            <rounded-button
                :field="buttonDecrement" 
                :disabled="data.value <= 1"
                @clicked-rounded="decrement"
            ></rounded-button>
            <input type="text" :placeholder="field.placeholder" v-model="data.value"  readonly>
            <span class="focus-input"></span>
            <rounded-button
                :field="buttonIncrement"
                @clicked-rounded = "increment"
            ></rounded-button>
        </div>
    `
};

const selectOption = {
    props: {
        field: { 
            required: true 
        },
        data: { 
            required: true 
        }
    },
    template: `
        <div class="wrap-input">
            <select v-model="data.value" :class="data.error.isActive ? 'error': '' ">
                <option v-for="option in data.options" :value="option.value">{{option.text}}</option>
            </select>
            <div v-if="data.error != null">
                <label v-if="data.error.isActive" class="error">
                    <i class="icon-x"></i>
                    {{data.error.message}}
                </label>
            </div>
        </div>
    `
}