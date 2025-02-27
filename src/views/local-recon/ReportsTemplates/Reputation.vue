<template>
    <div>
    <div class="dashboard-box stats-box w-full px-2 mb-5" v-if="!ignore_header">
            <v-card
            class="pa-2"
            tile
            >
            <div :class="(($vuetify.breakpoint.xs) ? 'p-1' : 'p-3')">
                <div class="flex flex-row flex-wrap">
                <div class="w-full lg:w-2/3" style="position: relative;">
                    <strong class="mt-2 text-lg">{{ search.keyword }}</strong>

                    <div v-if="search.properties.website" class="website mt-1 text-sm"><a href="search.properties.website" target="lr-website-link" style="color: #2477F6 !important;">{{ search.properties.website }}</a></div>

                    <div class="clearfix pt-4"></div>

                    <div class="flex flex-row flex-wrap">
                    <div class="w-full lg:w-1/2" style="position: relative;">
                        <div class="mb-2" style="color: #757B89; font-size: 11px;">Address</div>

                        {{ search.properties.formatted_address }}
                    </div>

                    <div class="w-full lg:w-1/2" style="position: relative;">
                        <div class="mb-2" style="color: #757B89; font-size: 11px;">Phone</div>

                        {{ search.properties.formatted_phone_number }}
                    </div>

                    <div class="w-full lg:w-1/2 pt-5" style="position: relative;">
                        <div class="mb-2" style="color: #757B89; font-size: 11px;">Primary Category</div>
                        {{ search.properties.custom_keyword ? ucwords(search.properties.custom_keyword.replace(/\_/g, ' ')) : ucwords(search.properties.types[0].replace(/\_/g, ' ')) }}
                    </div>

                    <div class="w-full lg:w-1/2 pt-5" style="position: relative;">
                        <div class="mb-2" style="color: #757B89; font-size: 11px;">Sub Category</div>

                        {{ ((search.properties.types[1]) ? ucwords(search.properties.types[1].replace(/\_/g, ' ')) : '-') }}
                    </div>
                    </div>

                    <div class="clearfix"></div>
                </div>

                <div class="lr-seo-audit-photo w-full lg:w-1/3">
                    <div v-if="search.properties.photos">
                    <img :src="'https://maps.googleapis.com/maps/api/place/photo?photo_reference=' + search.properties.photos[0].photo_reference + '&maxheight=200&key=AIzaSyBqF2vFVUoyeU3la0XVOQSOdkhgAfQdBEs'" />
                    </div>
                </div>
                </div>
            </div>
            </v-card>
        </div>

        <div class="flex flex-row flex-wrap">
            <div class="w-full lg:w-1/2" style="position: relative;">
            <div class="dashboard-box stats-box w-full px-2 mb-5">
                <v-card
                class="pa-2"
                tile
                >
                <div :class="(($vuetify.breakpoint.xs) ? 'p-1' : 'p-3')">
                    <div class="lr-report-subtitle">Overall Ratings</div>

                    <div class="stats-box-number large">{{ search.properties.rating || 0 }}</div>
                    
                    <div class="stats-box-icon-bg" style="top: 60px;"></div>
                    <div class="stats-box-icon" style="top: 60px;">
                    <i class="mdi mdi-star"></i>
                    </div>

                    <div class="clearfix"></div>
                    
                    <div style="float: left;">
                    <v-rating
                        class="mt-1 -ml-1"
                        :value="(parseFloat(search.properties.rating) || 0)"
                        :color="'orange ligten-1'"
                        dense
                        half-increments
                        readonly
                        size="20"
                    ></v-rating>
                    </div>
                    
                    <div class="text-sm pl-2" style="color: #757575; float: left; font-size: 12px; padding-top: 7px;">
                    Based on

                    <span class="mr-1">{{ search.properties.user_ratings_total || 0 }}</span>

                    <span class="text-gray-600" v-show="search.properties.user_ratings_total == 1">Review</span>
                    <span class="text-gray-600" v-show="search.properties.user_ratings_total != 1">Reviews</span>
                    </div>

                    <div class="clearfix"></div>
                </div>
                </v-card>
            </div>
            </div>

            <div class="w-full lg:w-1/2" style="position: relative;">
            <div class="dashboard-box stats-box w-full px-2 mb-5">
                <v-card
                class="pa-2"
                tile
                >
                <div :class="(($vuetify.breakpoint.xs) ? 'p-1' : 'p-3')">
                    <div class="lr-report-subtitle">Frequently Used Keywords</div>
                    
                    <div class="text-sm" style="color: #757575; font-size: 12px; padding-top: 7px; ">
                    Positive and negative words that frequently appeared in your reviews.
                    </div>

                    <div class="lr-faq-keywords" v-html="faq_keywords" style="height: 60px; overflow-x: auto;"></div>

                    <div class="clearfix"></div>
                </div>
                </v-card>
            </div>
            </div>
        </div>
        

        <div class="flex flex-row flex-wrap">
            <div class="w-full" style="position: relative;">
            <div class="dashboard-box stats-box w-full px-2 mb-5">
                <v-card
                class="pa-2"
                tile
                >
                <div :class="(($vuetify.breakpoint.xs) ? 'p-1' : 'p-3')">
                    <div class="lr-report-subtitle">Sentiment Analysis</div>

                    <div v-if="sentiment_data.length == 0">
                    <div class="pt-2">No data available.</div>
                    </div>
                    
                    <div class="flex flex-wrap mt-5">
                    <div 
                        v-for="(sentimentItem, index) in sentiment_data"
                        :key="index"
                        class="w-full md:w-1/3 pr-5 mb-6">
                        <div>
                        <div v-if="!$vuetify.breakpoint.xs && index < 3" style="background: #F7F8F8; padding: 5px;">
                            <div style="font-weight: bold; clear: both; margin-bottom: -23px;">Keyword</div>

                            <div class="flex flex-wrap mt-2">
                            <div class="w-full md:w-1/3">
                                &nbsp;
                            </div>
                            <div class="w-full md:w-2/3">
                                <div style="float: left; font-weight: bold; font-size: 12px;">
                                Positive
                                </div>
                                <div style="float: right; font-weight: bold; font-size: 12px;">
                                Negative
                                </div>
                                <div style="clear: both;"></div>
                            </div>
                            </div>
                        </div>

                        <div class="flex flex-wrap mt-2">
                            <div class="w-full md:w-1/3">
                            <v-chip color="rgba(36, 119, 246, 0.1)" text-color="#2477F6" style="font-size: 12px;">{{ sentimentItem.keyword }}</v-chip>
                            </div>
                            <div class="w-full md:w-2/3">
                            <b-progress class="mt-2" :max="sentimentItem.occurrences_total" show-value>
                                <b-progress-bar :value="sentimentItem.occurrences_positive" style="background: #81C784;"></b-progress-bar>
                                <b-progress-bar :value="sentimentItem.occurrences_negative" style="background: #FF8A65;"></b-progress-bar>
                            </b-progress>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </v-card>
            </div>
            </div>
        </div>

        <div class="flex flex-row flex-wrap">
            <div class="w-full lg:w-1/2" style="position: relative;">
                <div class="dashboard-box stats-box w-full px-2 mb-5">
                    <v-card
                    class="pa-2"
                    tile
                    >
                    <div :class="(($vuetify.breakpoint.xs) ? 'p-1' : 'p-3')">
                        <div class="lr-report-subtitle" style="border-bottom: 1px solid rgba(0, 0, 0, 0.05); padding-bottom: 10px;">Recent Reviews</div>

                        <div v-html="reviews_html" style="padding-top: 20px;"></div>
                    </div>
                    </v-card>
                </div>
            </div>

            <div class="w-full lg:w-1/2" style="position: relative;">
                <div class="dashboard-box stats-box w-full px-2 mb-5">
                    <v-card
                    class="pa-2"
                    tile
                    >
                    <div :class="(($vuetify.breakpoint.xs) ? 'p-1' : 'p-3')">
                        <div class="lr-report-subtitle" style="border-bottom: 1px solid rgba(0, 0, 0, 0.05); padding-bottom: 10px;">Negative Reviews</div>
                        
                        <div v-html="negative_reviews_html" style="padding-top: 20px;"></div>
                    </div>
                    </v-card>
                </div>
            </div>
        </div>
    </div>
  </template>
  
  
  <script>
  import axios from 'axios'
  import moment from 'moment'
  import $ from 'jquery'
  import ApexCharts from 'apexcharts'
  import VueGauge from "@/views/local-recon/VueGauge";
  
  export default {
    props: ['search', 'ignore_header'],
    data () {
        return {
            faq_keywords: "",
            reviews_html: "",
            negative_reviews_html: "",
        
            sentiment_data: [],
        }
    },
    methods: {
        ucwords (str) {
            return (str + '').replace(/^([a-z])|\s+([a-z])/g, function ($1) {
                return $1.toUpperCase();
            });
        },
    
        buildFuk() {
            let all_reviews_text = '';
            let reviews_html = '';
            let negative_reviews_html = '';
        
            let place = this.search.properties;
        
            if (typeof(place.reviews) == "undefined")
                place.reviews = [];
        
            if (place.reviews.length == 0) {
                reviews_html = '<div class="pt-2">No reviews found.</div>';
            }
            else {
                for (var i in place.reviews) {
                    let stars_html = '';
        
                    console.log('review details', place.reviews[i])
        
                    for (var j = 0; j < 5; j++) {
                        if (j + 1 <= place.reviews[i].rating)
                            stars_html += '<i class="mdi mdi-star" style="color: #FFB443; font-size: 14px; margin-left: 2px;"></i>';
                        else
                            stars_html += '<i class="mdi mdi-star-outline" style="font-size: 14px; margin-left: 2px;"></i>';
                    }
        
                    if (place.reviews[i].text.length > 180)
                        place.reviews[i].text = place.reviews[i].text.substring(0, 180) + '...';
        
                    let this_html = '<div style="padding-bottom: 10px; border-bottom: 1px solid rgba(0, 0, 0, 0.05); margin-bottom: 10px;">\
                        <div style=""><strong>' + place.reviews[i].author_name + '</strong> <em style="font-size: 11px;">' + moment(place.reviews[i].relative_time_description).fromNow() + '</em></div>\
                        <div style="float: right; margin-top: -25px;">\
                            <img src="https://regro-cdn.s3.amazonaws.com/images/review-services/www.google.com.png" style="height: 40px;" />\
                        </div>\
                        <div style="padding-top: 5px;">\
                        <strong>' + place.reviews[i].rating + '</strong> ' + stars_html + '\
                        </div>\
                        <div style="font-size: 12px; line-height: 20px; padding-top: 5px; color: #757B89;">\
                            ' + place.reviews[i].text + '\
                        </div>\
                    </div>';
        
                    reviews_html += this_html;
        
                    if (place.reviews[i].rating < 3)
                        negative_reviews_html += this_html;
        
                    all_reviews_text += place.reviews[i].text;
                }
            }
        
            if (negative_reviews_html == '')
                negative_reviews_html = '<div class="pt-2">No reviews found.</div>';
        
            this.reviews_html = reviews_html;
            this.negative_reviews_html = negative_reviews_html;
        
            let nthMostComm =this. nthMostCommon(all_reviews_text, 9);
        
            let faq_keywords_html = '';
        
            for (var i in nthMostComm) {
                if (nthMostComm[i].word != "undefined")
                    faq_keywords_html += '<span style="margin-right: 12px; background: rgba(25, 35, 58, 0.05); border-radius: 30px; padding: 10px; color: #757B89; font-size: 12px;">' + nthMostComm[i].word + '</span>';
            }
        
            let nthMostCommSentimentAnalysis = this.nthMostCommon(all_reviews_text, 13);
        
            for (var i in nthMostCommSentimentAnalysis) {
                if (nthMostCommSentimentAnalysis[i].word != "undefined") {
                let thisSentimentData = {
                    keyword: nthMostCommSentimentAnalysis[i].word,
                    occurrences_positive: 0,
                    occurrences_negative: 0,
                    occurrences_total: 0,
                    occurrences_positive_percentage: 0.00,
                    occurrences_negative_percentage: 0.00
                }
        
                for (var j in place.reviews) {
                    let thisReview = place.reviews[j];
        
                    if (thisReview.text.indexOf(thisSentimentData.keyword) != -1) {
                    thisSentimentData.occurrences_total++;
        
                    if (thisReview.rating < 3)
                        thisSentimentData.occurrences_negative++;
                    else
                        thisSentimentData.occurrences_positive++;
                    }
                }
        
                thisSentimentData.occurrences_positive_percentage = (thisSentimentData.occurrences_positive/thisSentimentData.occurrences_total) * 100;
                thisSentimentData.occurrences_negative_percentage = (thisSentimentData.occurrences_negative/thisSentimentData.occurrences_total) * 100;
        
                if (isNaN(thisSentimentData.occurrences_positive_percentage)) thisSentimentData.occurrences_positive_percentage = 0.00;
                if (isNaN(thisSentimentData.occurrences_negative_percentage)) thisSentimentData.occurrences_negative_percentage = 0.00;
                
                this.sentiment_data.push(thisSentimentData);
                }
            }
            
            console.log('nthMostCommSentimentAnalysis', nthMostCommSentimentAnalysis);
            
            this.faq_keywords = faq_keywords_html || "no words found";
        },
        nthMostCommon(string, amount) {
            string = string.replace(/\./g, ' ');
    
            var wordsArray = string.split(/\s/);
    
            let exclusion_list = ['the','be','to','of','and','a','in','that','have','i','it','for','not','on','with','he','as','you','do','at','this','but','his','by','from','they','we','say','her','she','or','an','will','my','one','all','would','there','their','what','so','up','out','if','about','who','get','which','go','me','when','make','can','like','time','no','just','him','know','take','people','into','year','your','good','some','could','them','see','other','than','then','now','look','only','come','its','over','think','also','back','after','use','two','how','our','work','first','well','way','even','new','want','because','any','these','give','day','most','us'];
    
            for (var i in wordsArray) {
                if (wordsArray[i].length < 4 || exclusion_list.indexOf(wordsArray[i].toLowerCase()) != -1)
                    delete wordsArray[i]
            }
    
            var wordOccurrences = {}
            for (var i = 0; i < wordsArray.length; i++) {
                wordOccurrences['_'+wordsArray[i]] = ( wordOccurrences['_'+wordsArray[i]] || 0 ) + 1;
            }
            var result = Object.keys(wordOccurrences).reduce(function(acc, currentKey) {
                /* you may want to include a binary search here */
                for (var i = 0; i < amount; i++) {
                    if (!acc[i]) {
                        acc[i] = { word: currentKey.slice(1, currentKey.length), occurences: wordOccurrences[currentKey] };
                        break;
                    } else if (acc[i].occurences < wordOccurrences[currentKey]) {
                        acc.splice(i, 0, { word: currentKey.slice(1, currentKey.length), occurences: wordOccurrences[currentKey] });
                        if (acc.length > amount)
                            acc.pop();
                        break;
                    }
                }
                return acc;
            }, []);
    
            return result;
        },
    },
    created() {
        this.buildFuk();
    }
  }
  </script>