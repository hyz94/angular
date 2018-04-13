import { Component } from '@angular/core';

//@ =>装饰符
//定义组件 
@Component({
  //定义选择器(标签选择器)
  selector: 'app-root',
  //指向模板文件
  templateUrl: './app.component.html',
  //样式文件
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
}
