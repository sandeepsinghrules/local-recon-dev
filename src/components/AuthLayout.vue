<template>
    <div class="rg-auth-wrapper">
        <div class="rg-auth-left">
            <div class="rg-auth-left-left-circle"></div>
            <div class="rg-auth-left-right-circle"></div>

            <div class="rg-auth-left-logo">
                <router-link :to="(($agency) ? '/login' : '/')" class="mb-12">
                    <img v-if="!$agency" src="@/assets/logo.png" alt="" style="width: 200px; margin-top: -10px;" />
                    <!-- Local Recon -->
                </router-link> 
            </div>

            <div class="rg-auth-left-content">
                <div class="rg-auth-left-content-title">Local Recon</div>
                <div class="rg-auth-left-content-subtitle">
                    <span v-if="page == 'login'">Sign in to your account</span>
                    <span v-if="page == 'signup'">Create an account to get started</span>
                    <span v-if="page == 'forgot'">Reset your password</span>
                </div>
            </div>
        </div>
        <div class="rg-auth-right">
            <div class="rg-auth-right-content">
                <div class="rg-auth-right-logo">
                    <router-link :to="(($agency) ? '/login' : '/')" class="mb-12">
                        <!-- <img v-if="!$agency" src="https://reviewgrower.com/wp-content/uploads/2021/09/reviewgrower-blue-green-middle-e1652210601332.png" alt="" style="max-width: 200px; margin: auto;"> -->
                        <!-- <img v-if="!$agency" src="@/assets/logo-dark.png" alt="" style="width: 250px;" /> -->
                        <span v-if="$agency">
                            <span v-if="!$agency.logo">{{ $agency.company_name }}</span>
                            <img v-if="$agency.logo" :src="$agency.logo" alt="" style="max-height: 80px;">
                        </span>
                        <!-- <img src="@/assets/icon-gray3.png" alt="" style="max-width: 120px;" class="mb-12">  -->
                    </router-link> 
                </div>
                <slot></slot>
            </div>
            <div v-if="page == 'login' && $agency && $agency.settings.signup_link" class="rg-auth-signup-link-wrapper">
                <span class="text-sm">Don't have an account?</span>
                <div class="border-1 border-blue text-primary text-xs text-bold px-4 py-2 rounded cursor-pointer float-right ml-3" @click="$router.push('/signup')" style="margin-top: -5px;">GET STARTED</div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
  props: ['page']
}
</script>

<style>
    .rg-auth-wrapper {
        width: 100%;
        height: 100%;
        display: flex;
        font-family: 'Avenir Next', 'Nunito', sans-serif;
        overflow: hidden;
    }

    .rg-auth-wrapper .rg-auth-left {
        background: #2477F6;
        height: 100%;
        position: relative;
        width: 45%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        position: relative;
    }

    .rg-auth-wrapper .rg-auth-right {
        width: 55%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        overflow-y: scroll;
        background: #FFFFFF;
    }

    .rg-auth-wrapper .rg-auth-left-left-circle {
        position: absolute;
        width: 350px;
        height: 350px;
        left: -175px;
        bottom: -175px;

        background: rgba(255, 255, 255, 0.1);
        border-radius: 50%;
    }

    .rg-auth-wrapper .rg-auth-left-right-circle {
        position: absolute;
        width: 87px;
        height: 87px;
        bottom: 70px;
        right: 70px;

        background: rgba(255, 255, 255, 0.1);
        border-radius: 50%;
    }

    .rg-auth-left-logo {
        position: absolute;
        left: 30px;
        top: 30px;
    }

    .v-application .rg-auth-left-logo a {
        color: #FFFFFF !important;
        font-weight: bold;
    }

    .rg-auth-left-content-title {
        font-size: 44px;
        line-height: 56px;
        padding-bottom: 20px;
        font-weight: 600;
        padding: 5px 0;
        color: #FFFFFF;
    }

    .rg-auth-left-content-subtitle {
        font-size: 22px;
        color: #FFFFFF;
    }

    .rg-auth-right-content {
        width: 500px;
        max-width: 80%;
    }

    .rg-auth-right-logo {
        display: none;
    }

    .rg-auth-signup-link-wrapper {
        position: absolute;
        top: 50px;
        right: 50px;
    }

    .rg-auth-field {
        background: rgba(25, 35, 58, 0.05) !important;
        border-radius: 5px !important;
        outline: none;
    }

    @media(max-width:1100px) {
        .rg-auth-wrapper .rg-auth-right {
            width: 100%;
        }

        .rg-auth-wrapper .rg-auth-left {
            display: none;
        }

        .rg-auth-right-logo {
            text-align: center;
            display: initial;
            margin-bottom: 40px;
            display: block;
        }

        .v-application .rg-auth-right-logo a {
            color: #000000 !important;
            font-weight: bold;
            font-size: 40px;
        }

        .rg-auth-signup-link-wrapper {
            position: relative;
            top: auto;
            right: auto;
            padding-top: 40px;
        }
    }
</style>