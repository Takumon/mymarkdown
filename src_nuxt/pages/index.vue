<template>
  <section class="container">
    <div>
      <app-logo/>
      <h1 class="title">
        Markdown Mome
      </h1>
      <md-button class="md-raised md-primary" @click="increment()">{{ selectedMemoIndex }}</md-button>

      <h2 class="subtitle">
        Online markdown memo
      </h2>
      <md-button class="md-raised md-primary" @click="setShowSnackbar({
            isShow: true,
            text: 'Sample Message'
        })">{{ selectedMemoIndex }}</md-button>
      <div>
        <i class="fab fa-apple"></i>
      </div>
      <div class="links">
        <a
          href="https://nuxtjs.org/"
          target="_blank"
          class="button--green">Documentation</a>
        <a
          href="https://github.com/nuxt/nuxt.js"
          target="_blank"
          class="button--grey">GitHub</a>
      </div>
      <div>Scroll Ratio = {{scrollRatio}}</div>
      <div class="scroll-area"  v-scroll="onScroll">
        <p>0.01</p><p>0.02</p><p>0.03</p><p>0.04</p><p>0.05</p><p>0.06</p><p>0.07</p><p>0.08</p><p>0.09</p><p>0.10</p>
        <p>0.11</p><p>0.12</p><p>0.13</p><p>0.14</p><p>0.15</p><p>0.16</p><p>0.17</p><p>0.18</p><p>0.19</p><p>0.20</p>
        <p>0.21</p><p>0.22</p><p>0.23</p><p>0.24</p><p>0.25</p><p>0.26</p><p>0.27</p><p>0.28</p><p>0.29</p><p>0.30</p>
        <p>0.31</p><p>0.32</p><p>0.33</p><p>0.34</p><p>0.35</p><p>0.36</p><p>0.37</p><p>0.38</p><p>0.39</p><p>0.40</p>
        <p>0.41</p><p>0.42</p><p>0.43</p><p>0.44</p><p>0.45</p><p>0.46</p><p>0.47</p><p>0.48</p><p>0.49</p><p>0.50</p>
        <p>0.51</p><p>0.52</p><p>0.53</p><p>0.54</p><p>0.55</p><p>0.56</p><p>0.57</p><p>0.58</p><p>0.59</p><p>0.60</p>
        <p>0.61</p><p>0.62</p><p>0.63</p><p>0.64</p><p>0.65</p><p>0.66</p><p>0.67</p><p>0.68</p><p>0.69</p><p>0.70</p>
        <p>0.71</p><p>0.72</p><p>0.73</p><p>0.74</p><p>0.75</p><p>0.76</p><p>0.77</p><p>0.78</p><p>0.79</p><p>0.80</p>
        <p>0.81</p><p>0.82</p><p>0.83</p><p>0.84</p><p>0.85</p><p>0.86</p><p>0.87</p><p>0.88</p><p>0.89</p><p>0.90</p>
        <p>0.91</p><p>0.92</p><p>0.93</p><p>0.94</p><p>0.95</p><p>0.96</p><p>0.97</p><p>0.98</p><p>0.99</p><p>1.00</p>
      </div>
      <div>
        <textarea v-model="markdownText"></textarea>
        <div class="preview markdown-body" v-html="preview()"></div>
      </div>

    </div>
  </section>
</template>

<script>
import AppLogo from '~/components/AppLogo.vue'
import marked from 'marked';
import hljs from 'highlightjs';
import { mapState, mapActions } from 'vuex';


export default {
  components: {
    AppLogo
  },
  data() {
    return {
      count: 0,
      scrollRatio: 0,
      markdownText: '',
    }
  },
  created: function() {
    marked.setOptions({
      gfm: true,
      breaks: true,
      langPrefix: '',
      highlight: function (code, langAndTitle, callback) {
        const lang = langAndTitle ? langAndTitle.split(':')[0] : '';
        return hljs.highlightAuto(code, [lang]).value;
      }
    });
  },
  computed: {
    ...mapState([
      'selectedMemoIndex'
    ])
  },
  methods: {
    ...mapActions([
      'setSelectedMemoIndex',
      'setShowSnackbar',
    ]),
    increment() {
      this.setSelectedMemoIndex(this.selectedMemoIndex + 1)
    },
    onScroll:function($event, { scrollTop })　{
      const scrollAreaHight = $event.srcElement.scrollHeight - $event.srcElement.clientHeight
      this.scrollRatio = ($event.srcElement.scrollTop / scrollAreaHight)
    },
    preview: function() {
      return  marked(this.markdownText)
    },
  }

}
</script>

<style>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}

.scroll-area {
  overflow-y: scroll;
  height: 200px;
  border: 1px solid black;
  border-radius: 4px;
}
</style>
