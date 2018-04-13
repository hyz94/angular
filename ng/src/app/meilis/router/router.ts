import { RouterModule, Routes } from '@angular/router';

import {HomeComponent} from '../components/home/home.component';
import {IndexComponent} from '../components/index/index.component';
import {ClassifyComponent} from '../components/classify/classify.component';
import {ListComponent} from '../components/list/list.component';
import {BuycarComponent} from '../components/buycar/buycar.component';
import {MineComponent} from '../components/mine/mine.component';
import {DetailComponent} from '../components/detail/detail.component';
import {LoginComponent} from '../components/login/login.component';
import {RegisterComponent} from '../components/register/register.component';
import {FourpageComponent} from '../components/fourpage/fourpage.component';
import {UnpwdComponent} from '../components/unpwd/unpwd.component';
import {ForgetpwdComponent} from '../components/forgetpwd/forgetpwd.component';
import {ShezhiComponent} from '../components/shezhi/shezhi.component';
import {UserSetComponent} from '../components/user-set/user-set.component';

import {BirSettingComponent} from '../components/bir-setting/bir-setting.component';
import { HelpcenterComponent } from '../components/helpcenter/helpcenter.component';
import { ChatComponent } from '../components/chat/chat.component';
import {SecurityComponent } from '../components/security/security.component';
import {ChangepwdComponent} from '../components/changepwd/changepwd.component';
import {ShoucangComponent} from '../components/shoucang/shoucang.component';

 

import {SearchComponent} from '../components/search/search.component';
import {AccountComponent} from '../components/buycar/account/account.component';
import {AddressComponent} from '../components/address/address.component'
import {SanjiliandongComponent} from '../components/address/sanjiliandong/sanjiliandong.component'
import {ManageaddressComponent} from '../components/manageaddress/manageaddress.component'



 const routes: Routes=[
    {
        path:'',
        component:HomeComponent,
        children:[
            {path: '',redirectTo: '/meilisindex', pathMatch: 'full'},
            {path:'meilisindex',component:IndexComponent},
            {path:'meilisclassify',component:ClassifyComponent},
            {path:'meilisbuycar',component:BuycarComponent},
            {path:'meilismine',component:MineComponent}
        ]
    },
    {path:'meilisdetail',component:DetailComponent},
    {path:'meilissearch',component:SearchComponent},
    {path:'meilislist',component:ListComponent},
    {path:'meilislogin',component:LoginComponent},
    {path:'meilisregister',component:RegisterComponent},
    {path:'meilisunpwd',component:UnpwdComponent},
    {path:'meilisforget',component:ForgetpwdComponent},
    {path:'mineShezhi',component:ShezhiComponent},
    {path:'userSetting',component:UserSetComponent},

    {path:'birSetting',component:BirSettingComponent},
    {path:'helpcenter',component:HelpcenterComponent},
    {path:'chat',component:ChatComponent},
    {path:'security',component:SecurityComponent},
    {path:'shoucang',component:ShoucangComponent},


    {path:'meilisAccount',component:AccountComponent},
    {path:'sanjiliandong',component:SanjiliandongComponent},
    {path:'changepwd',component:ChangepwdComponent},

    {path:'address',component:AddressComponent},
    {path:'manageAddress',component:ManageaddressComponent},
    {path:'**',component:FourpageComponent}
 ]


export const AppRouter = RouterModule.forRoot(
    routes,
    {enableTracing:false}
)