
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ApartmentCard, { ApartmentProps } from "@/components/ApartmentCard";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useLanguage } from "@/contexts/LanguageContext";
import { allApartments } from "@/data/appData";

export default function Apartments() {
  const { t } = useLanguage();
  const [filteredApartments, setFilteredApartments] = useState<ApartmentProps[]>(allApartments);
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [locationFilter, setLocationFilter] = useState<string>("all");
  const [priceMax, setPriceMax] = useState<number>(150);
  const [priceDzdMax, setPriceDzdMax] = useState<number>(25000);

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  // Apply filters
  useEffect(() => {
    let result = allApartments;

    // Filter by apartment type
    if (typeFilter !== "all") {
      result = result.filter(apt => apt.type === typeFilter);
    }

    // Filter by location
    if (locationFilter !== "all") {
      result = result.filter(apt => apt.location === locationFilter);
    }

    // Filter by price max (Euro)
    result = result.filter(apt => apt.priceeur <= priceMax);

    // Filter by price max (DZD)
    result = result.filter(apt => apt.pricedz <= priceDzdMax);

    setFilteredApartments(result);
  }, [typeFilter, locationFilter, priceMax, priceDzdMax]);

  // Get unique locations for filter
  const locations = ["all", ...new Set(allApartments.map(apt => apt.location))];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 pt-20">
        {/* Header Section */}
        <section className="relative py-8 bg-gradient-to-r from-sea-light to-white dark:from-sea-dark dark:to-background overflow-hidden">
          <div className="container relative z-10">
            <div className="max-w-3xl mx-auto text-center animate-fade-in">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                {t.apartments.title}
              </h1>
              <p className="text-muted-foreground text-lg mb-6">
                {t.apartments.subtitle}
              </p>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute bottom-0 right-0 w-1/2 h-1/2 opacity-10">
            <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-primary/50 blur-3xl" />
            <div className="absolute top-10 right-40 w-48 h-48 rounded-full bg-sea-light blur-3xl" />
          </div>
        </section>

        {/* Filter Section */}
        <section className="py-8 border-b">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
              {/* Apartment Type Filter */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  {t.labels.type}
                </label>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={t.labels.type} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t.apartments.filters.allTypes}</SelectItem>
                    <SelectItem value="Studio">{t.apartmentTypes.Studio}</SelectItem>
                    <SelectItem value="F2">{t.apartmentTypes.F2}</SelectItem>
                    <SelectItem value="F3">{t.apartmentTypes.F3}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Location Filter */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  {t.apartments.filters.location}
                </label>
                <Select value={locationFilter} onValueChange={setLocationFilter}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={t.apartments.filters.location} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t.apartments.filters.allLocations}</SelectItem>
                    {locations.filter(loc => loc !== "all").map(location => (
                      <SelectItem key={location} value={location}>
                        {t.locations[location] || location}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Price Range Filters */}
              <div className="space-y-4">
                {/* Euro Price Range Filter */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t.apartments.filters.priceRange}: ≤ €{priceMax}
                  </label>
                  <Slider
                    defaultValue={[150]}
                    min={30}
                    max={150}
                    step={5}
                    value={[priceMax]}
                    onValueChange={([val]) => setPriceMax(val)}
                    className="my-4 rtl"
                    style={{ direction: 'rtl' }}
                  />
                </div>

                {/* DZD Price Range Filter */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t.apartments.filters.priceRange}: ≤ DZD{priceDzdMax.toLocaleString()}
                  </label>
                  <Slider
                    defaultValue={[25000]}
                    min={8000}
                    max={25000}
                    step={500}
                    value={[priceDzdMax]}
                    onValueChange={([val]) => setPriceDzdMax(val)}
                    className="my-4 rtl"
                    style={{ direction: 'rtl' }}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center mt-6 animate-fade-in [animation-delay:200ms]">
              <p className="text-muted-foreground">
                {t.apartments.filters.showing} {filteredApartments.length} {t.apartments.filters.of} {allApartments.length} {t.apartments.filters.accommodations}
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setTypeFilter("all");
                  setLocationFilter("all");
                  setPriceMax(150);
                  setPriceDzdMax(25000);
                }}
              >
                {t.apartments.filters.resetFilters}
              </Button>
            </div>
          </div>
        </section>

        {/* Apartments Grid */}
        <section className="section">
          <div className="container">
            {filteredApartments.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredApartments.map((apartment, index) => (
                  <div key={apartment.id} className="animate-fade-in" style={{ animationDelay: `${(index + 1) * 100}ms` }}>
                    <ApartmentCard apartment={apartment} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 animate-fade-in">
                <h3 className="text-xl font-semibold mb-2">{t.apartments.filters.noMatch}</h3>
                <p className="text-muted-foreground mb-6">{t.apartments.filters.adjustFilters}</p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setTypeFilter("all");
                    setLocationFilter("all");
                    setPriceMax(150);
                    setPriceDzdMax(25000);
                  }}
                >
                  {t.apartments.filters.resetFilters}
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
