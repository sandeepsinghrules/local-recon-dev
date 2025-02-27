import Vue from 'vue'
import Router from 'vue-router'

// Public
import Home from './views/landing/Home.vue'
import Signup from './views/landing/Signup.vue'
import SignupConfirm from './views/landing/SignupConfirm.vue'
import Login from './views/landing/Login.vue'
import ForgotPassword from './views/landing/ForgotPassword.vue'
import ResetPassword from './views/landing/ResetPassword.vue'
import Terms from './views/landing/Terms.vue'
import Privacy from './views/landing/Privacy.vue'

import PhoneTextPolicy from './views/landing/PhoneTextPolicy.vue'

// Private
import Dashboard from './views/panel/Dashboard/Index.vue'
import History from './views/panel/History.vue'
import SearchResults from './views/panel/SearchResults.vue'
import Inbox from './views/panel/Inbox.vue'
import Templates from './views/panel/Templates.vue'
import PersonalizationImages from './views/panel/PersonalizationImages.vue'
import Import from './views/panel/Import.vue'
import Settings from './views/panel/Settings.vue'
import ReviewFunnel from './views/panel/ReviewFunnel.vue'
import ReviewFunnelPublic from './views/panel/ReviewFunnelPublic.vue'
import UserSettings from './views/panel/UserSettings.vue'
import Contacts from './views/panel/Contacts.vue'
import AddContactExternal from './views/panel/AddContactExternal.vue'
import Reviews from './views/panel/Reviews.vue'
import Feedback from './views/panel/Feedback.vue'
import Billing from './views/panel/Billing.vue'
import SocialPosting from './views/panel/SocialPosting.vue'
import Widgets from './views/panel/Business/Widgets/Index.vue'
import WidgetsForm from './views/panel/Business/Widgets/Form.vue'
import WidgetsPreview from './views/panel/Business/Widgets/Preview.vue'
import WidgetsRender from './views/panel/Business/Widgets/Render/Index.vue'
import Reports from './views/panel/Business/Reports.vue'
import ReviewPlatforms from './views/panel/ReviewPlatforms.vue'
import ProviderSuccess from './views/panel/ProviderSuccess.vue'
import Locations from './views/panel/Locations.vue'

// Agency components
import Businesses from './views/panel/Agency/Businesses.vue'
import AgencySettings from './views/panel/Agency/Settings.vue'
import Resources from './views/panel/Agency/Resources.vue'
// END Agency components

// Admin components
import Agencies from './views/panel/Admin/Agencies.vue'
import AdminUsers from './views/panel/Admin/Users.vue'
import AdminLocalReconReports from './views/local-recon/AdminReports.vue'
import ReportLogs from './views/local-recon/Logs/Index.vue'
// END Admin components

import EmailVerify from './views/panel/EmailVerify.vue'

// Local Recon
import LocalReconDashboard from './views/local-recon/Dashboard.vue'
import LocalReconLeads from './views/local-recon/Leads.vue'
import LocalReconLeadDetails from './views/local-recon/LeadDetails.vue'
import LocalReconReports from './views/local-recon/Reports.vue'
import LocalReconWidgets from './views/local-recon/Widgets.vue'
import LocalReconWidgetForm from './views/local-recon/WidgetForm.vue'
import LocalReconReportPublic from './views/local-recon/ReportPublic.vue'
import LocalReconWidgetsRender from './views/local-recon/WidgetsRender.vue'
import LocalReconWidgetView from './views/local-recon/WidgetView.vue'
import LocalReconBulkReports from './views/local-recon/BulkReports.vue'
import LocalReconScheduledReports from './views/local-recon/ScheduledReports/Index.vue'
import LocalReconScheduledReportsForm from './views/local-recon/ScheduledReports/Form.vue'
import LocalReconOwnReport from './views/local-recon/OwnReport.vue'

// Image Editor
import ImageEditor from './views/panel/ImageEditor.vue'

// Grid
import GridTrackerApp from './views/panel/GridTrackerApp.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior: function(to) {
    if (to.hash) {
      return {selector: to.hash}
    } else {
      return { x: 0, y: 0 }
    }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    // {
    //   path: '/signup',
    //   name: 'signup',
    //   component: Signup
    // },
    {
      path: '/signup/plan/:plan_id',
      name: 'signup_plan',
      component: Signup
    },
    {
      path: '/signup/:company_type/plan/:plan_id',
      name: 'signup_company_type',
      component: Signup
    },
    {
      path: '/signup/confirm',
      name: 'signup_confirm',
      component: SignupConfirm
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      component: ForgotPassword
    },
    {
      path: '/reset-password/:token',
      name: 'reset-password',
      component: ResetPassword
    },

    // {
    //   path: '/terms-of-service',
    //   name: 'terms-of-service',
    //   component: PhoneTextPolicy
    // },
    // {
    //   path: '/blog',
    //   name: 'blog',
    //   component: Blog
    // },
    // {
    //   path: '/blog/should-you-buy-online-reviews',
    //   component: () => import('./views/landing/articles/should-you-buy-online-reviews.vue')
    // },
    // {
    //   path: '/contact',
    //   name: 'contact',
    //   component: Contact
    // },
    {
      path: '/privacy-policy',
      name: 'privacypolicy',
      component: Privacy
    },
    {
      path: '/terms-of-service',
      name: 'termsofservice',
      component: Terms
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: LocalReconDashboard
    },
    {
      path: '/history',
      name: 'History',
      component: History
    },
    {
      path: '/search/:id',
      name: 'SearchResults',
      component: SearchResults
    },
    {
      path: '/inbox',
      name: 'Inbox',
      component: Inbox
    },
    {
      path: '/templates',
      name: 'Templates',
      component: Templates
    },
    {
      path: '/personalization-images',
      name: 'PersonalizationImages',
      component: PersonalizationImages
    },
    {
      path: '/image-editor',
      name: 'ImageEditor',
      component: ImageEditor
    },
    {
      path: '/image-editor/:id',
      name: 'ImageEditor',
      component: ImageEditor
    },
    {
      path: '/business/:id',
      name: 'Business',
      component: () => import('./views/panel/BusinessDetail.vue')
    },
    {
      path: '/import',
      name: 'import',
      component: Import
    },
    // {
    //   path: '/settings',
    //   name: 'settings',
    //   component: Settings
    // },
    {
      path: '/review-funnel',
      name: 'review-funnel',
      component: ReviewFunnel
    },
    {
      path: '/user-settings',
      name: 'user-settings',
      component: UserSettings
    },
    {
      path: '/contacts',
      name: 'contacts',
      component: Contacts
    },
    {
      path: '/add-contact/:uuid',
      name: 'add-contact',
      component: AddContactExternal
    },
    {
      path: '/reviews',
      name: 'reviews',
      component: Reviews
    },
    {
      path: '/feedback',
      name: 'feedback',
      component: Feedback
    },
    {
      path: '/billing',
      name: 'billing',
      component: Billing
    },
    {
      path: '/social-posting',
      name: 'social-posting',
      component: SocialPosting
    },
    {
      path: '/social-share/:review_id',
      name: 'social-share',
      component: SocialPosting
    },
    {
      path: '/widgets',
      name: 'widgets',
      component: Widgets
    },
    {
      path: '/widgets/create',
      name: 'widgets_create',
      component: WidgetsForm
    },
    {
      path: '/widgets/edit/:token',
      name: 'widgets_edit',
      component: WidgetsForm
    },
    {
      path: '/widgets/edit/:token/:action',
      name: 'widgets_edit_token',
      component: WidgetsForm
    },
    {
      path: '/widgets/preview/:token',
      name: 'widgets_preview',
      component: WidgetsPreview
    },
    {
      path: '/widgets/render/:token',
      name: 'widgets_render',
      component: WidgetsRender
    },
    {
      path: '/reports',
      name: 'reports',
      component: Reports
    },
    {
      path: '/review-platforms',
      name: 'reviewplatforms',
      component: ReviewPlatforms
    },
    {
      path: '/provider/:devslug/success',
      name: 'providersuccess',
      component: ProviderSuccess
    },
    {
      path: '/auth/:provider/callback',
      component: {
        template: '<div class="auth-component"></div>'
      }
    },
    {
      path: '/locations',
      name: 'locations',
      component: Locations
    },

    // Agency routes
    {
      path: '/businesses',
      name: 'businesses',
      component: Businesses
    },

    {
      path: '/settings',
      name: 'settings',
      component: AgencySettings
    },
    {
      path: '/resources',
      name: 'resources',
      component: Resources
    },
    // END Agency routes

    // Admin routes
    {
      path: '/agencies',
      name: 'agencies',
      component: Agencies
    },

    {
      path: '/admin-users',
      name: 'adminusers',
      component: AdminUsers
    },
    {
      path: '/admin/reports',
      name: 'admin_local_recon_reports',
      component: AdminLocalReconReports
    },
    {
      path: '/admin/report-logs/:id',
      name: 'admin_report_logs',
      component: ReportLogs
    },
    
    // END Admin routes

    {
      path: '/email/verify/:user_id/:token',
      name: 'email-verify',
      component: EmailVerify
    },


    // Local Recon Routes
    {
      path: '/local-recon/dashboard',
      name: 'local_recon_dashboard',
      component: LocalReconDashboard
    },
    {
      path: '/local-recon/leads',
      name: 'local_recon_leads',
      component: LocalReconLeads
    },
    {
      path: '/local-recon/lead/:id',
      name: 'local_recon_lead_details',
      component: LocalReconLeadDetails
    },
    {
      path: '/local-recon/reports',
      name: 'local_recon_reports',
      component: LocalReconReports
    },
    {
      path: '/local-recon/widgets',
      name: 'local_recon_widgets',
      component: LocalReconWidgets
    },
    {
      path: '/local-recon/widgets/create',
      name: 'local_recon_widgets_create',
      component: LocalReconWidgetForm
    },
    {
      path: '/local-recon/widgets/edit/:token',
      name: 'local_recon_widgets_edit',
      component: LocalReconWidgetForm
    },
    {
      path: '/local-recon/widgets/view/:token',
      name: 'local_recon_widgets_view',
      component: LocalReconWidgetView
    },
    {
      path: '/local-recon/widgets/edit/:token/:action',
      name: 'local_recon_widgets_edit_token',
      component: LocalReconWidgetForm
    },
    {
      path: '/rf',
      name: 'local_recon_report',
      component: LocalReconReportPublic
    },
    {
      path: '/local-recon/widgets/render/:token',
      name: 'widgets_render_local_recon',
      component: LocalReconWidgetsRender
    },
    {
      path: '/local-recon/bulk-reports',
      name: 'local_recon_bulk_reports',
      component: LocalReconBulkReports
    },
    {
      path: '/local-recon/own-report',
      name: 'local_recon_own_report',
      component: LocalReconOwnReport
    },
    {
      path: '/local-recon/scheduled-reports',
      name: 'local_recon_scheduled_reports',
      component: LocalReconScheduledReports
    },
    {
      path: '/local-recon/scheduled-reports/create',
      name: 'local_recon_scheduled_reports_create',
      component: LocalReconScheduledReportsForm
    },
    {
      path: '/local-recon/scheduled-reports/edit/:id',
      name: 'local_recon_scheduled_reports_edit',
      component: LocalReconScheduledReportsForm
    },

    {
      path: '/grid-tracker/app',
      name: 'grid-tracker-app',
      component: GridTrackerApp
    },
    // END Local Recon Routes


    // This needs to be the last item
    {
      path: '/:review_funnel_short_name',
      name: 'review-funnel-public',
      component: ReviewFunnelPublic
    },
  ]
})
