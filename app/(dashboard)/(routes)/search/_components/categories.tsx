"use client"

import { Category } from "@prisma/client";
import{
  FcBusinessman,
  FcBusinesswoman,
  FcCurrencyExchange,
  FcCalculator,
  FcIdea,
  FcWorkflow,
  FcCollaboration,
  FcSalesPerformance,
  FcConferenceCall,
  FcServices,
  FcTodoList,
  FcLibrary,
  FcPositiveDynamic,
  FcAdvertising,
  FcVoicePresentation,
  FcBullish,
  FcOrgUnit,
  FcAssistant,

}from "react-icons/fc";
import { IconType } from "react-icons";
import { CategoryItem } from "./category-item";

interface CategoriesProps{
    items: Category[];
}

const iconMap: Record<Category["name"], IconType>={
    
   "Entrepreneurship & Business Development" : FcBusinessman ,
   "Finance and Accounting" : FcCurrencyExchange ,
   "Technology and Innovation" : FcIdea ,
   "Skill Development & Vocational Training" : FcWorkflow ,
   "Marketing & Sales" : FcSalesPerformance ,
   "Management & Leadership" : FcConferenceCall ,
   "Government Schemes & Policies" : FcServices ,
   "Soft Skills & Communication" : FcVoicePresentation ,
   "Sector-Specific Training": FcLibrary ,
}

export const Categories=({
    items,
}: CategoriesProps)=> {
    return(
        <div className="flex items-center gap-x-2 overflow-x-auto pb-2">
            {items.map((item)=>(
                <CategoryItem
                key={item.id}
                label={item.name}
                icon={iconMap[item.name]}
                value={item.id}
                />
            ))}
        </div>
    )
}
