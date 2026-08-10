import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Property } from '../model/properties.model';
import { PropertyResponse } from '../dto/properties-response.dto';
import { CreatePropertyRequest } from '../dto/properties-request.dto';

@Injectable({
  providedIn: 'root',
})
export class PropertyClient {
  private readonly httpClient = inject(HttpClient);

  getAllProperties(){
    return this.httpClient.get<PropertyResponse[]>("http://localhost:8080/api/v1/properties");
  }

  getPropertyById(id:number){
    return this.httpClient.get<PropertyResponse>(`http://localhost:8080/api/v1/properties/${id}`);
  }

  addProperty(property: CreatePropertyRequest){
    return this.httpClient.post<PropertyResponse>("http://localhost:8080/api/v1/properties", property);
  }

  deletePropertyById(id:number){
    return this.httpClient.delete<PropertyResponse>(`http://localhost:8080/api/v1/properties/${id}`);
  }

}
