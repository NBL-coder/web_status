import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConectionsService } from '../services/conections.service'
import { DataService } from '../services/data.service';
import { interval,  } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  
  public name: any;
  public url: any;
  public category: any;

  public name_info: any = "Site name";
  public url_info: any = "Site Infomation";
  public category_info: any = "Site category";
  public conection_staus:any;

  public selected_index: any = -1;
  public data_action: any = "Add";

  public curernt_user:any = localStorage.getItem("UserName");

  url_list:any = [];
  url_ping_result:any =[];
  default_filter: any = "All";
  filter:any = this.default_filter;
  categories_arr:any = [];
  Data:any = [];
  observable= interval(2000);
  constructor(
    private conn: ConectionsService, 
    private dataservice: DataService, 
    private rouuter:Router,
    private authen:AuthenticationService 
    ) {
    const subscription = this.observable.subscribe(val => {
     //this.url_ping_result= [];
     this.url_list = [...new Set(this.Data.map((item:any) => item.url))];
     this.url_list.forEach((element:any) => {
      this.getSiteStatus(element).then((res:any) =>{
        var url_data = {url: element,ping:res};
        var check_update = 0;
        this.url_ping_result.forEach((element_2:any) => {
            if(element_2.url === url_data.url){
              element_2.ping = url_data.ping;
              check_update = 1;
            }
        });
        if (check_update == 0){
          this.url_ping_result.push(url_data);
        }
      });
     });
     console.log(this.url_ping_result);
    });  
    
    this.loadData(this.filter);
  }
  getClassOf(val:any) {
    if (val >= 0 && val <= 500) {
      return 'con_fast';
    } else if (val > 500 && val <= 1000) {
      return 'con_medium';
    } else if (val > 1000) {
      return 'con_slow';
    }else {
      return 'con_lost'
    }
  }

  loadData(filter:any){ 
    //this.Data = await this.dataservice.getData();
    this.dataservice.getData().subscribe(res =>{
      this.Data = res;
      var temp_arr = [...new Set(this.Data.map((item:any) => item.categories.toString()))];
      this.categories_arr = [...new Set(temp_arr)];
      
      this.filter =filter;
    });
  }
  async addData(){
    await this.dataservice.addData(
      { name: this.name, 
        url: this.url,
        categories: this.category
      });
    this.name = "";
    this.url = "";
    this.category = "";
    this.loadData(this.filter);
    //window.location.reload();
  }

  async removeData(index:any){
    this.dataservice.removeData(index);
    this.Data.splice(index,1);
  }
  async updateData(){
    var new_item = { 
      name: this.name, 
      url: this.url,
      categories: this.category
    };
    await this.dataservice.updateData(this.selected_index,new_item);
    this.loadData(this.filter);
    this.selected_index = -1;
    this.data_action = "Add";
  }
  async getItemInfo(index:any){
    var item = this.Data[index];
    this.name = item.name;
    this.url = item.url;
    this.category = item.categories;
    this.selected_index = index;
    this.data_action ="Update";
    this.name_info = item.name;
    this.category_info = item.categories;
    var info = "URL: " + item.url
    this.url_info = info;
    

  }
  async getSiteStatus (url:any){
    return await this.conn.urlPing(url);
  }
  cancel_select(){
    this.selected_index = -1;
    this.data_action = "Add";
    this.name = "";
    this.url = "";
    this.category = "";
    this.name_info = "Site name";
    this.url_info = "Site Infomation";
    this.category_info = "Site category";
    this.conection_staus = "";

  }
  logout(){
    this.authen.logout();
  }
}
