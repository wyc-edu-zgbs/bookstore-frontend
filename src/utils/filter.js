import Vue from 'vue'

Vue.filter('formatPrice', (value)=>{
    return '¥' + Number(value).toFixed(2);
});

Vue.filter('media2url', (value)=>{
    return process.env.BASE_URL + 'media/' + value
});

