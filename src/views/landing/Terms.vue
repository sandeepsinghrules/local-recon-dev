<template>
  <div>
    <landing-navigation />
    <div class="container mx-auto px-6 py-12">

      <h1>Terms of Service</h1>

      <p>Welcome to Local Recon, the audit software owned by Review Grower LLC, 8 The Green STA A, Dover, DE 19901, United States. Should you disagree with any of the provisions herein, you must not use the Service, but please let us know at <a href="mailto:support@reviewgrower.com">support@reviewgrower.com</a>. We'll be happy to hear your comments and suggestions.<p>

      <h2>1. Terms</h2>

      <p>By accessing this Website, accessible from Local Recon.com, you are agreeing to be bound by these Website Terms and Conditions of Use and agree that you are responsible for the agreement with any applicable local laws. If you disagree with any of these terms, you are prohibited from accessing this site. The materials contained in this Website are protected by copyright and trade mark law.</p>

      <h2>2. Use License</h2>

      <p>Permission is granted to temporarily download one copy of the materials on Local Recon's Website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:</p>

      <ul>
          <li>modify or copy the materials;</li>
          <li>use the materials for any commercial purpose or for any public display;</li>
          <li>attempt to reverse engineer any software contained on Local Recon's Website;</li>
          <li>remove any copyright or other proprietary notations from the materials; or</li>
          <li>transferring the materials to another person or "mirror" the materials on any other server.</li>
      </ul>

      <p>This will let Local Recon to terminate upon violations of any of these restrictions. Upon termination, your viewing right will also be terminated and you should destroy any downloaded materials in your possession whether it is printed or electronic format.</p>

      <h2>3. Disclaimer</h2>

      <p>All the materials on Local Recon’s Website are provided "as is". Local Recon makes no warranties, may it be expressed or implied, therefore negates all other warranties. Furthermore, Local Recon does not make any representations concerning the accuracy or reliability of the use of the materials on its Website or otherwise relating to such materials or any sites linked to this Website.</p>

      <h2>4. Limitations</h2>

      <p>Local Recon or its suppliers will not be hold accountable for any damages that will arise with the use or inability to use the materials on Local Recon’s Website, even if Local Recon or an authorize representative of this Website has been notified, orally or written, of the possibility of such damage. Some jurisdiction does not allow limitations on implied warranties or limitations of liability for incidental damages, these limitations may not apply to you.</p>

      <h2>5. Revisions and Errata</h2>

      <p>The materials appearing on Local Recon’s Website may include technical, typographical, or photographic errors. Local Recon will not promise that any of the materials in this Website are accurate, complete, or current. Local Recon may change the materials contained on its Website at any time without notice. Local Recon does not make any commitment to update the materials.</p>

      <h2>6. Links</h2>

      <p>Local Recon has not reviewed all of the sites linked to its Website and is not responsible for the contents of any such linked site. The presence of any link does not imply endorsement by Local Recon of the site. The use of any linked website is at the user’s own risk.</p>

      <h2>7. Site Terms of Use Modifications</h2>

      <p>Local Recon may revise these Terms of Use for its Website at any time without prior notice. By using this Website, you are agreeing to be bound by the current version of these Terms and Conditions of Use.</p>

      <h2>8. Governing Law</h2>

      <p>Any claim related to Local Recon's Website shall be governed by the laws of de without regards to its conflict of law provisions.</p>

      <h2>9. Cancelation/Refund Policy:</h2>

      <p>All sales are final, and Local Recon does not offer any money-back guarantees. You recognize and agree that you shall not be entitled to a refund for any purchase under any circumstances. You can, however, cancel your subscription any time by sending an request to <a href="mailto:support@reviewgrower.com">support@reviewgrower.com</a></p>

    </div>
    <!-- <landing-footer></landing-footer> -->
  </div>
</template>

<script>
import LandingNavigation from '@/components/LandingNavigation.vue'
import LandingFooter from '@/components/LandingFooter.vue'

export default {
  components: {
    LandingNavigation,
    LandingFooter
  },
  metaInfo: {
    title: 'Terms of Service | Local Recon'
  }
};
</script>

<style lang="postcss" scoped>

h1 {
  @apply mb-4 text-xl;
}

h2 {
  @apply mt-6 mb-2 font-semibold;
}

p {
  @apply mb-2;
}

ul {
  @apply ml-8 mt-4 mb-4 list-disc;
}



</style>
