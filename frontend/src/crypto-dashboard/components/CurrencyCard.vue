<template>
    <div class="coin-box" @dblclick.stop="openDetails">
        <div class="row no-gutters coin-info">
            <div class="col-7">
                
                <div class="row no-gutters mt-1" style="display:flex">
                    <div class="box-icon">
                        <span :style="{ backgroundImage : 'url('+ iconbase +')' }"></span>
                    </div>
                    <div class="col text-left" v-if="ticker">
                      <div class="font-weight-bold">{{info.name}}</div>
                        <div><b>{{info.base}}</b>/{{info.quote}}</div>
                        <div class="coin-price text-primary text-bold font-weight-bold"  v-if="ticker?.price">{{ticker?.price || '' }}<span style="font-size: x-small; font-weight: 700; padding-left: 3px;">{{info.quote}}</span></div>
                    </div>
                </div>
            </div>
              <div :class="[Number(ticker?.percent < 0)?'down':'up', 'col-5','text-right']" v-if="ticker?.price">
                <div class="coin-per"><span class="indicator"></span><span>{{ ticker.percent }}%</span></div>
                <div class="coin-chg">{{parseFloat(Number(ticker.chg)).toFixed((info.quote === 'USDT') ? 3 : 8)}} </div>
                <div><span class="text-primary">Vol:</span> <span class="text-dark">{{ ticker.vol }}</span></div>
            </div>
        </div>
        <div class="sparkline-chart" v-if="ticker?.price" style="margin-top: -7rem;padding:5px">
            <Sparkline :cdata="ticker?.price" :width="380" :height="90"></Sparkline>
        </div>
    </div>
</template>
<script>
  import Sparkline from './Sparkline.vue'
  import {unSubscribeSymbol} from '../services/binance'
  export default {
    props: ['ticker', 'info'],
    data() {
      return {
        showDropDown: false
      }
    },
    computed: {
        iconbase() {
            return `https://s2.coinmarketcap.com/static/img/coins/64x64/${this.info.cid}.png`
        }
    },
    methods: {
      onDropDown() {
        this.showDropDown = true;
      },
      removeCard() {
        this.showDropDown = false;
        unSubscribeSymbol(this.info.symbol);
        this.$store.commit('REMOVE_COIN_PAIR', this.info.symbol)
      },
      openDetails() {
        this.showDropDown = false;
        this.$router.push({name: 'infoview', params: { 'symbol': this.info.symbol }})
      },
      closeDropDown() {
        this.showDropDown = false;
      }
    },
    components: {
      Sparkline
    }
  }
</script>
