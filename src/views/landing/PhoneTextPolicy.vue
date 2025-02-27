<template>
    <div>
        <div class="" style="padding: 50px; text-align: center;">
            <img v-if="!$agency" src="@/assets/logo-dark.png" alt="" style="width: 250px;" />
        </div>

      <div class="" style="max-width: 1200px; margin: auto;">
  
        <h1 class="text-2xl text-bold mb-4 text-center">Phone &amp; Text Message Policy</h1>

        <br />
  
        <div class="contents"> <p><strong>YOUR COMPANY, NONPROFIT AND/OR END USER IS LIABLE FOR ALL TEXT MESSAGES AND CALLS ORIGINATING FROM YOUR ACCOUNT. PERIOD.</strong><br /> <br /> I, The Local Lead Sniper User Or Company Representative, DECLARE THAT I HAVE READ AND AGREE TO THE TERMS OF SERVICE, AND AGREE TO THE FOLLOWING:<br /> IF YOU DO NOT AGREE WITH ANY TERMS ON THIS WEBSITE, PLEASE LEAVE BY CLOSING YOUR INTERNET BROWSER WINDOW NOW. IF YOU DO NOT INTEND TO FOLLOW THE "RESPONSIBLE USE OF SERVICE" TERMS, DO NOT UTILIZE Local Lead Sniper.COM. <br /> <br /> It is the intention of Local Lead Sniper and its customers to maintain the highest standards possible in the course of business. <br /> In no event will Local Lead Sniper will be liable to customer for any indirect, special, incidental, consequential, exemplary, or punitive loss or damage of any kind, including lost profits (whether or not Local Lead Sniper has been advised or the possibility of such loss or damages) by reason of any act or omission in its performance under this agreement. <br /> Local Lead Sniper respects the privacy rights or wishes of any person who does not want to be called by any organization. You The Subscriber and user of Local Lead Sniper&#39;s software understands that you are 100% responsible and liable for how you use the software and agree to comply with all State and Federal guidelines governing text and telemarketing laws and regulations.<br /> <strong>I Agree as a Subscriber and or user of the Local Lead Sniper software that:</strong><br /> <ul> <li> I will make sure that I am familiar with any Federal or State Laws that would be applicable to my call or text message campaign.</li> <li> I will ensure software is used in full compliance with all applicable laws and regulations.</li> <li> I will adhere to State and Federal permitted time calling windows, including time zones I am calling in and from for all outbound calls or text messages. </li> <li> I will provide callers with an automated way of removing their number(s) from being called in the future.</li> <li> I will place all callers requesting to be put on a DNC status immediately through Local Lead Sniper&#39;s dialer features and keep your own internal DNC list.</li> <li> I understand that allowing those on my calling list to be removed and avoiding calls to those who do not want to be called is vital with regard to responsible calling campaigns.</li> <li> I will provide accurate and legal caller id&#39;s along with contact information.</li> <li> I will clearly state the identity of the caller at the beginning of my audio message and provide proper contact information such as phone number and address during call.</li> <li> I WILL NOT send calls to emergency, life services or utility company numbers.</li> <li> I will avoid sending pre-recorded sales messages to those whom you do not have a business relationship and to whom you haven&#39;t received permission to call.</li> <li> I will avoid sending unsolicited audio messages to those who will incur charges. For example: beepers, pagers or cell phones unless proper prior permission has been obtain by the recipient.</li> <li> I will avoid sending unsolicited text messages to those whom you do not have a business relationship and you haven&#39;t received permission to send text messages.</li> </ul> <br /> Although Local Lead Sniper does not make any calling campaigns of its own, the following policy is mandatory in all solicitations and campaigns by clients using our platform and/or resellers using our software on their own platforms. We will also process any DNC requests received by our company which were meant to be directed to our resellers or clients in this fashion so as not to further inconvenience the call recipient any further.<br /> To help insure you the Subscriber and or user of the software are always up to date please consult an attorney or similar compliance resource. Below are some helpful links to help you in your compliance efforts.<br /> <br /> Federal Trade Communications (FTC): <a href="http://www.ftc.gov/">http://www.ftc.gov</a><br /> Federal Communications Commission (FCC): <a href="http://www.fcc.gov/">http://www.fcc.gov</a><br /> Do Not Call (DNC) Registry: <a href="http://www.donotcall.gov/">http://www.donotcall.gov</a><br /> Do Not Call (DNC) Rules: <a href="http://telemarketing.donotcall.gov/">http://telemarketing.donotcall.gov</a><br /> If you would like to add your number to the National Do Not Call Registry, applicable to all telemarketers, you may do so by calling 1-888-382-1222, or online at <a href="http://www.donotcall.gov/" target="_blank">www.donotcall.gov</a>. If your number is already on the National Do Not Call Registry and you received a telemarketing call from someone using Local Lead Sniper&#39;s products, please let us know by submitting a contact request so that we can correct the problem. Please include as much information as possible, especially Caller ID information and the specific offer made during the call.<br /> Please read through our entire policy and refer to our Terms and Conditions for further information. By using our platform, you are agreeing that you accept these terms and conditions, and will abide by these policies and procedures.</p> </div> 
  
      </div>
    </div>
  </template>
  
  <script>
  import LandingNavigation from '@/components/LandingNavigation.vue'
  import LandingFooter from '@/components/LandingFooter.vue'
  import axios from 'axios'
  
  export default {
    components: {
      LandingNavigation,
      LandingFooter
    },
    metaInfo () {
      return {
        title: "Phone & Text Message Policy | " + this.$appName
      }
    },
    data() {
      return {
      }
    },
    methods: {
    }
  };
  </script>
  
  <style>
    input, textarea {
      border-style: solid;
    }
  </style>