import * as React from 'react';
import styles from './Faq.module.scss';
import { IFaqProps } from './IFaqProps';
import { SPFI } from '@pnp/sp';
import { useEffect, useState } from 'react';
import { IFAQ } from '../../../interface';
import { getSP } from '../../../pnpjsConfig';

// 1. Import SPFX Accordions
import { Accordion } from "@pnp/spfx-controls-react/lib/Accordion";

// 7. Field Picker for pulling SHAREPOINT CUSTOM LIST FIELDS
import { Placeholder } from "@pnp/spfx-controls-react/lib/Placeholder";
import { WebPartTitle } from "@pnp/spfx-controls-react/lib/WebPartTitle"

// 2. import { escape } from '@microsoft/sp-lodash-subset';
const Faq = (props:IFaqProps) => {
  // 3. Get List Names and Properties
  
  //const LOG_SOURCE = 'FAQ Webpart';
 // const LIST_NAME = 'FAQ';
  let _sp:SPFI = getSP(props.context);

// 4. Set the State
  const [faqItems,setFaqItems] = useState<IFAQ[]>([])

  const getFAQItems = async () => {
      // 5. Pull list data from sp web Sharepoint
      console.log('context',_sp)
      // const items = _sp.web.lists.getByTitle(LIST_NAME).items.select().orderBy('Letter',true).orderBy('Title',true)();
      const items = _sp.web.lists.getById(props.listGuid).items.select().orderBy('Letter',true).orderBy('Title',true)();


      // 6. Display list items in console
      console.log('FAQ Items',items)
      setFaqItems((await items).map((item:any) => {
        return {
            Id: item.Id,
            Title: item.Title,
            Content: item.Content,
            Letter: item.Letter
        }
      }));
  }

  useEffect(() => {


    if(props.listGuid && props.listGuid != '') {
      getFAQItems();
    }

    
  },[props])

    // 7. Write our the Accordions and extract Front End Code
  return (
      <div className={styles.faq}> 

<WebPartTitle displayMode={props.displayMode}
              title={props.title}
              updateProperty={props.updateProperty} />

        {props.listGuid ? faqItems.map((item:IFAQ,index:number) => {
          return (<Accordion key={index} title={item.Title} 
            defaultCollapsed={true} className={"itemCell"} collapsedIcon={"ChevronRight"} expandedIcon={"ChevronDown"}>
               <p>{item.Content}</p>
            </Accordion>)
        }) : <Placeholder iconName='Edit'
        iconText='Configure your web part'
        description='Please configure the web part. Pick up your EWR Sharepoint List'
        buttonLabel='Configure'
        onConfigure={() => props.context.propertyPane.open()}
        />}
        </div>
     
  )

}

export default Faq 

 
