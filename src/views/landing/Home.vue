<template>
  <div class="">
    <landing-navigation />

    <section class="bg-green-500 text-white">
      <div class="container mx-auto text-center py-10 px-6">
        <div class="mb-8 mx-auto" style="max-width:750px;">
          <h1 class="text-2xl mb-3 font-bold">Encourage customers to leave <span class="text-yellow-400 border-b-4 border-yellow-400">reviews</span> for your business</h1>
          <p class="">Import your existing customers and invite them via Email or SMS to leave a review on pages like Yelp, Google Maps, Facebook or any other review platform.</p>
          <!--<h1 class="text-2xl mb-3 font-bold">Collect <span class="text-yellow-400 border-b-4 border-yellow-400">more reviews</span> for your online or offline business</h1>-->
          <!--<p class="">Connect your <span class="">accounting software</span> or <span class="">payment processor</span> and invite your customers to leave a review.</p>-->
        </div>

        <router-link to="/signup">
          <button class="shadow rounded px-4 py-2 bg-yellow-400 text-gray-800 border-yellow-400 hover:bg-yellow-500 hover:border-yellow-500 zoom font-bold">Get Started Free</button>
        </router-link>
      </div>
    </section>

    <section class="bg-gray-100 pt-24 pb-6">
      <div class="container mx-auto px-6">

        <!-- feature import -->
        <div class="flex flex-row flex-wrap items-center">

            <div class="w-full lg:w-1/2 lg:px-10 mb-24">
              <img src="@/assets/images/features/feature-import-2.jpg" class="shadow-md rounded-lg w-full" alt="" style="">
            </div>

            <div class="w-full lg:w-1/2 lg:px-10 mb-24">
              <h2 class="text-xl font-bold mb-4 text-gray-800">We make it easy to import your contacts</h2>
              <div class="text-gray-800 mb-10">Import your existing contacts directly from your accounting software or payment processor. You can upload a CSV File with your contacts as well. We take care of filtering and removing any duplicate contacts for you.</div>

              <div class="flex flex-row">
                <div class="mr-4">
                  <img src="@/assets/images/features/pic-jou-wong.jpg" class="rounded-full border-2 border-white" style="width: 70px;" alt="">
                </div>
                <div class="flex-1">
                  <div class="italic text-sm text-gray-600 mb-2">"Finally, we got rid of our spreadsheets and started to manage our invites with one tool. Their <span class="font-bold">Stripe integration</span> makes it easy to keep our contacts information up to date."</div>
                  <div class="text-sm">- Jou Wong</div>
                </div>
              </div>

            </div>

        </div>

        <!-- feature invite -->
        <div class="flex flex-row flex-wrap items-center">

            <div class="w-full lg:w-1/2 lg:px-10 mb-24">
              <h2 class="text-xl font-bold mb-4 text-gray-800">Send invites via Email and SMS</h2>
              <div class="text-gray-800 mb-10">
                Use customizable texts to invite your customers by Email or SMS and ask them to leave a review for your company.
              </div>
              
              <div class="flex flex-row">
                <div class="mr-4">
                  <img src="@/assets/images/features/pic-maria-howard.jpg" class="rounded-full border-2 border-white" style="width: 70px;" alt="">
                </div>
                <div class="flex-1">
                  <div class="italic text-sm text-gray-600 mb-2">"Lead Finder helped us to automate our invitation process and focus on things that matter for our business."</div>
                  <div class="text-sm">- Maria Howard</div>
                </div>
              </div>

            </div>

            <div class="w-full lg:w-1/2 lg:px-10 mb-24">
              <img src="@/assets/images/features/feature-invite-2.jpg" class="shadow-md rounded-lg w-full overflow-hidden" alt="" style="">
            </div>

        </div>

        <!-- feature user segmentation -->
        <div class="flex flex-row flex-wrap items-center">

            <div class="w-full lg:w-1/2 lg:px-10 mb-24 flex flex-row justify-end items-center">
              <img src="@/assets/images/features/feature-usersegmentation-2.jpg" class="shadow-md rounded-lg w-full overflow-hidden" alt="">
            </div>

            <div class="w-full lg:w-1/2 lg:px-10 mb-24">
              <h2 class="text-xl font-bold mb-4 text-gray-800">Effective user segmentation and templates</h2>
              <div class="text-gray-800 mb-10">We provide options to help you filter customers based on happiness. That way you can make sure that the right customers land on your review platforms.</div>

              <div class="flex flex-row">
                <div class="mr-4">
                  <img src="@/assets/images/features/pic-barry-lonsen.jpg" class="rounded-full border-2 border-white" style="width: 70px;" alt="">
                </div>
                <div class="flex-1">
                  <div class="italic text-sm text-gray-600 mb-2">"Many businesses have never asked their customers for reviews. Thanks to Lead Finder and the resulting reviews, we have been able to improve our search engine ranking significantly."</div>
                  <div class="text-sm">- Barry Lonsen</div>
                </div>
              </div>

            </div>

        </div>

        <!-- feature review platforms -->
        <div class="flex flex-row flex-wrap items-center">

            <div class="w-full lg:w-1/2 lg:px-10 mb-24">
              <h2 class="text-xl font-bold mb-4 text-gray-800">Receive reviews on any platform</h2>
              <div class="text-gray-800 mb-10">
                Add any review platform where you want to bring your customers to and receive more reviews.
              </div>
              
              <div class="flex flex-row">
                <div class="mr-4">
                  <img src="@/assets/images/features/pic-rebecca-khoury.jpg" class="rounded-full border-2 border-white" style="width: 70px;" alt="">
                </div>
                <div class="flex-1">
                  <div class="italic text-sm text-gray-600 mb-2">"We have been in business for several years with only a few reviews on Google Maps. It took us a month to receive the same amount of reviews, which took us years before."</div>
                  <div class="text-sm">- Rebecca Khoury</div>
                </div>
              </div>

            </div>

            <div class="w-full lg:w-1/2 lg:px-10 mb-24">
              <img src="@/assets/images/features/feature-reviewplatforms-2.jpg" class="shadow-md rounded-lg w-full overflow-hidden" alt="">
            </div>

        </div>


      </div>
    </section>


    <!-- Pricing -->
    <section id="pricing" class="mt-20 mb-12">
      <div class="container mx-auto px-6">

        <div class="flex flex-row flex-wrap justify-center">
          
          <div class="flex flex-col px-12 mb-8 justify-between">
            <h3 class="text-2xl font-semibold text-center mb-2">Free</h3>

            <div class="mb-6">
              <div class="whitespace-no-wrap text-center"><span class="text-3xl font-bold mr-1">$0</span>/month</div>
            </div>

            <div class="flex flex-col">
              <div class="mb-6">

                <div class="mb-2 border-b border-dotted">
                  <div class="text-sm mb-1">10 Email Invites</div>
                </div>

                <div class="mb-2 border-b border-dotted">
                  <div class="text-sm mb-1">0 SMS Invites</div>
                </div>

                <div class="mb-2 border-b border-dotted">
                  <div class="text-sm mb-1"><span class="font-bold">Unlimited</span> Review Platforms</div>
                </div>

                <div class="mb-2 border-b border-dotted">
                  <div class="text-sm mb-1"><span class="font-bold">Unlimited</span> Connected Apps</div>
                </div>


              </div>

              <router-link to="/signup">
                <button class="w-full bg-green-500 rounded text-white px-3 py-2 hover:bg-green-400">Get Started Free</button>
              </router-link>
              
            </div>
            
          </div>

          <div class="flex flex-col px-12 mb-8 justify-between">
            <h3 class="text-2xl font-semibold text-center mb-2">Starter</h3>

            <div class="mb-6">
              <div class="whitespace-no-wrap text-center"><span class="text-3xl font-bold mr-1">$5</span>/month</div>
            </div>

            <div class="flex flex-col">
              <div class="mb-6">

                <div class="mb-2 border-b border-dotted">
                  <div class="text-sm mb-1">100 Email Invites</div>
                </div>

                <div class="mb-2 border-b border-dotted">
                  <div class="text-sm mb-1">10 SMS Invites</div>
                </div>

                <div class="mb-2 border-b border-dotted">
                  <div class="text-sm mb-1"><span class="font-bold">Unlimited</span> Review Platforms</div>
                </div>

                <div class="mb-2 border-b border-dotted">
                  <div class="text-sm mb-1"><span class="font-bold">Unlimited</span> Connected Apps</div>
                </div>


              </div>

              <router-link to="/signup">
                <button class="w-full bg-green-500 rounded text-white px-3 py-2 hover:bg-green-400">Get Started Free</button>
              </router-link>
              
            </div>
            
          </div>

          <div class="flex flex-col px-12 mb-8 justify-between">
            <h3 class="text-2xl font-semibold text-center mb-2">Business</h3>

            <div class="mb-6">
              <div class="whitespace-no-wrap text-center"><span class="text-3xl font-bold mr-1">$29</span>/month</div>
            </div>


            <div class="flex flex-col">
              <div class="mb-6">

                <div class="mb-2 border-b border-dotted">
                  <div class="text-sm mb-1">1000 Email Invites</div>
                </div>

                <div class="mb-2 border-b border-dotted">
                  <div class="text-sm mb-1">100 SMS Invites</div>
                </div>

                <div class="mb-2 border-b border-dotted">
                  <div class="text-sm mb-1"><span class="font-bold">Unlimited</span> Review Platforms</div>
                </div>

                <div class="mb-2 border-b border-dotted">
                  <div class="text-sm mb-1"><span class="font-bold">Unlimited</span> Connected Apps</div>
                </div>


              </div>


              <router-link to="/signup">
                <button class="w-full bg-green-500 rounded text-white px-3 py-2 hover:bg-green-400">Get Started Free</button>
              </router-link>
            
            </div>
            
          </div>

          <div class="flex flex-col px-12 mb-8 justify-between">
            <h3 class="text-2xl font-semibold text-center mb-2">Enterprise</h3>

            <div class="mb-6">
              <div class="whitespace-no-wrap text-center">Contact sales</div>
            </div>


            <div class="flex flex-col">
              <div class="mb-6">

                <div class="mb-2 border-b border-dotted">
                  <div class="text-sm mb-1">> 1000 Email Invites</div>
                </div>

                <div class="mb-2 border-b border-dotted">
                  <div class="text-sm mb-1">> 100 SMS Invites</div>
                </div>

                <div class="mb-2 border-b border-dotted">
                  <div class="text-sm mb-1"><span class="font-bold">Unlimited</span> Review Platforms</div>
                </div>

                <div class="mb-2 border-b border-dotted">
                  <div class="text-sm mb-1"><span class="font-bold">Unlimited</span> Connected Apps</div>
                </div>

              </div>

              <router-link to="/contact">
                <button class="w-full bg-white rounded text-green-500 px-3 py-2 border border-green-500 hover:bg-gray-100">Contact sales</button>
              </router-link>

            </div>

            
          </div>

        </div>

      </div>
    </section>

    <!-- Integrates with -->
    <section class="bg-gray-200">
      <div class="container mx-auto px-6">

        <div class="flex flex-col items-center">
          
          <div class="text-gray-600 mt-12">Integrates with</div>

          <div class="flex flex-row flex-wrap items-center justify-center mt-8 mb-16">
            <img src="@/assets/images/providers/logos/logo-gray-stripe.png" class="mx-8" alt="" style="height:30px;">
            <img src="@/assets/images/providers/logos/logo-gray-sevdesk.png" class="mx-8" alt="" style="height:30px;">
            <img src="@/assets/images/providers/logos/logo-gray-quickbooks.png" class="mx-8" alt="" style="height:50px;">
            <img src="@/assets/images/providers/logos/logo-gray-xero.png" class="mx-8" alt="" style="height:50px;">
          </div>

        </div>

      </div>
    </section>

    <!-- Footer -->
    <landing-footer />


  </div>
</template>

<!--<template>
  <div>
    <landing-navigation />
    <section class="has-background-primary">
      <div class="container">
        <div class="intro">
          <h1 class="is-size-4 has-text-white has-text-centered has-text-weight-bold">Collect <u>more reviews</u> for your online or offline business</h1>
          <p class="is-size-6 has-text-white has-text-centered">Connect your accounting software or payment processor and start collecting reviews from your customers.</p>
          <p class="has-text-centered" style="margin-top: 30px;">
            <router-link to="/signup">
              <button class="button is-yellow has-text-weight-bold zoom">Create an account</button>
            </router-link>
          </p>
        </div>

      </div>

    </section>

  </div>
</template>-->

<script>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'
import LandingNavigation from '@/components/LandingNavigation.vue'
import LandingFooter from '@/components/LandingFooter.vue'

export default {
  components: {
    LandingNavigation,
    LandingFooter
  },
  metaInfo: {
    title: 'Lead Finder: Automated review follow-ups for your business',
    meta: [
      { name: 'description', content: 'Collect more reviews with automated Email and SMS invites for your online or offline business. Build customer trust and increase search engine ranking.' },
      { name: 'keywords', content: 'review, generation, automation, feedback, customers, reviews, more customer reviews, reputation'}
    ]
  },
  created() {
    // if (window.location.origin != process.env.VUE_APP_MAIN_URL) {
      this.$router.push('/dashboard')
    // }
  }
};
</script>

<style lang="scss" scoped>
.intro {
  padding-top: 80px;
  padding-bottom: 80px;
}
.highlighted-text {
    border-radius: 1em 0 1em 0;
    background-image: linear-g
    radient(-100deg,rgba(247,198,2,.05),rgba(247,198,2,.5) 95%,rgba(247,198,2,0));
}

.border-green-500 {
  border-style: solid;
}

.flex, .child-flex > * {
  flex: inherit;
}
</style>

