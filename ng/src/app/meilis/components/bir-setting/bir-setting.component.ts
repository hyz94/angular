import { Component, OnInit } from '@angular/core';
import { DatapickService } from '../../server/datapick.service';
// import   '../../../../assets/birthSet/datePicker.js'
@Component({
  selector: 'app-bir-setting',
  templateUrl: './bir-setting.component.html',
  styleUrls: ['./bir-setting.component.scss']
})
export class BirSettingComponent implements OnInit {

  constructor( private userSetting:DatapickService ) { }

  ngOnInit() {
      let is: any =this;

      // var calendar = new datePicker();
      // calendar.init({
      //     'trigger': '#demo1', /*按钮选择器，用于触发弹出插件*/
      //     'type': 'date',/*模式：date日期；datetime日期时间；time时间；ym年月；*/
      //     'minDate':'1900-1-1',/*最小日期*/
      //     'maxDate':'2100-12-31',/*最大日期*/
      //     'onSubmit':function(){/*确认时触发事件*/
      //       var theSelectData=calendar.value;
      //       is.userSetting.birthDay = $('#demo1').val();
      //     },
      //     'onClose':function(){/*取消时触发事件*/

      //     }
      // });

  }

  goback(){
    window.history.back()
  }



}
