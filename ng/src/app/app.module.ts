import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';



import { AppComponent } from './app.component';
import { IndexComponent } from './meilis/components/index/index.component';
import { HomeComponent } from './meilis/components/home/home.component';
import { ListComponent } from './meilis/components/list/list.component';
import { ClassifyComponent } from './meilis/components/classify/classify.component';
import { BuycarComponent } from './meilis/components/buycar/buycar.component';
import { MineComponent } from './meilis/components/mine/mine.component';
import { LoginComponent } from './meilis/components/login/login.component';
import { RegisterComponent } from './meilis/components/register/register.component';
import { DetailComponent } from './meilis/components/detail/detail.component';

import { AppRouter } from './meilis/router/router';
import { NavComponent } from './meilis/components/home/nav/nav.component';
import { FourpageComponent } from './meilis/components/fourpage/fourpage.component';
import { UnpwdComponent } from './meilis/components/unpwd/unpwd.component';
import { ForgetpwdComponent } from './meilis/components/forgetpwd/forgetpwd.component';
import { ShezhiComponent } from './meilis/components/shezhi/shezhi.component';
import { UserSetComponent } from './meilis/components/user-set/user-set.component';

import { BirSettingComponent } from './meilis/components/bir-setting/bir-setting.component';


import { SearchComponent } from './meilis/components/search/search.component';


import { HttpclientService } from './meilis/server/httpclientserver.service';
import { DatapickService } from './meilis/server/datapick.service';
import { HelpcenterComponent } from './meilis/components/helpcenter/helpcenter.component';
import { ChatComponent } from './meilis/components/chat/chat.component'

import { DetailnavComponent } from './meilis/components/detail/detailnav/detailnav.component'

import { YoulikeComponent } from './meilis/components/buycar/youlike/youlike.component';
import { AccountComponent } from './meilis/components/buycar/account/account.component';
import { SecurityComponent } from './meilis/components/security/security.component';
import { AddressComponent } from './meilis/components/address/address.component';
import { SanjiliandongComponent } from './meilis/components/address/sanjiliandong/sanjiliandong.component';
import { ManageaddressComponent } from './meilis/components/manageaddress/manageaddress.component'

import { ChangepwdComponent } from './meilis/components/changepwd/changepwd.component';
import { ShoucangComponent } from './meilis/components/shoucang/shoucang.component'



@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    HomeComponent,
    ListComponent,
    ClassifyComponent,
    BuycarComponent,
    MineComponent,
    LoginComponent,
    RegisterComponent,
    DetailComponent,
    NavComponent,
    FourpageComponent,
    UnpwdComponent,
    ForgetpwdComponent,
    ShezhiComponent,
    UserSetComponent,

    BirSettingComponent,
    HelpcenterComponent,
    ChatComponent,

    SearchComponent,
    YoulikeComponent,
    AccountComponent,
    DetailnavComponent,
    SecurityComponent,
  
    ChangepwdComponent,

    DetailnavComponent,
    AddressComponent,
    SanjiliandongComponent,
    ShoucangComponent,
    SanjiliandongComponent,
    ManageaddressComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRouter
  ],

  providers: [HttpclientService,DatapickService],


  bootstrap: [AppComponent]
})
export class AppModule { }
