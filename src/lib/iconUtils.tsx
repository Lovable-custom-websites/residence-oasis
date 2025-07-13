import {
  FaUsers,
  FaExpand,
  FaMapMarkerAlt,
  FaBath,
  FaWifi,
  FaTv,
  FaWind,
  FaHome,
  FaWater,
  FaSnowflake,
  FaFire,
  FaTint
} from "react-icons/fa";
import { FaKitchenSet } from "react-icons/fa6";
import { PiOvenBold } from "react-icons/pi";
import {
  MdKitchen,
  MdLocalLaundryService,
  MdBalcony,
  MdMicrowave,
  MdKitchen as MdOven
} from "react-icons/md";
import { BiFridge } from "react-icons/bi";

export const getFeatureIcon = (feature: string, size: string = "h-3.5 w-3.5") => {
  const iconClass = size;
  
  switch (feature.toLowerCase()) {
    case "bathroom":
    case "salle de bain":
      return <FaBath className={iconClass} />;
    case "kitchen":
    case "full kitchen":
    case "cuisine":
    case "cuisine complète":
      return <FaKitchenSet className={iconClass} />;
    case "wi-fi":
      return <FaWifi className={iconClass} />;
    case "tv":
      return <FaTv className={iconClass} />;
    case "air conditioning":
    case "climatisation":
      return <FaWind className={iconClass} />;
    case "washing machine":
    case "machine à laver":
      return <MdLocalLaundryService className={iconClass} />;
    case "balcony":
    case "terrace":
    case "balcon":
    case "terrasse":
      return <MdBalcony className={iconClass} />;
    case "jacuzzi":
      return <FaWater className={iconClass} />;
    case "oven":
    case "four":
      return <PiOvenBold className={iconClass} />;
    case "stove":
    case "plaque de cuisson":
      return <FaFire className={iconClass} />;
    case "microwave":
    case "micro-ondes":
      return <MdMicrowave className={iconClass} />;
    case "refrigerator":
    case "frigo":
    case "réfrigérateur":
      return <BiFridge className={iconClass} />;
    case "congélateur":
    case "freezer":
      return <FaSnowflake className={iconClass} />;
    case "dishwasher":
    case "lave-vaisselle":
      return <FaTint className={iconClass} />;
    default:
      return <FaHome className={iconClass} />;
  }
}; 