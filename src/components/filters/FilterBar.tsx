import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, X } from "lucide-react";

interface FilterBarProps {
  onFilterChange: (filters: any) => void;
}

const FilterBar = ({ onFilterChange }: FilterBarProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedDeliveryType, setSelectedDeliveryType] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const subjects = [
    "Mathematics", "Physics", "Chemistry", "Biology", "Computer Science",
    "English", "History", "Psychology", "Economics", "Engineering"
  ];

  const deliveryTypes = ["Text", "Audio", "Screen"];

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    onFilterChange({
      search: value,
      subject: selectedSubject,
      deliveryType: selectedDeliveryType,
    });
  };

  const handleSubjectChange = (value: string) => {
    setSelectedSubject(value);
    onFilterChange({
      search: searchTerm,
      subject: value,
      deliveryType: selectedDeliveryType,
    });
  };

  const handleDeliveryTypeChange = (value: string) => {
    setSelectedDeliveryType(value);
    onFilterChange({
      search: searchTerm,
      subject: selectedSubject,
      deliveryType: value,
    });
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedSubject("");
    setSelectedDeliveryType("");
    onFilterChange({
      search: "",
      subject: "",
      deliveryType: "",
    });
  };

  const hasActiveFilters = searchTerm || selectedSubject || selectedDeliveryType;

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search help requests..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Filter Toggle */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowFilters(!showFilters)}
          className="gap-2"
        >
          <Filter className="h-4 w-4" />
          Filters
          {hasActiveFilters && (
            <Badge variant="default" className="h-5 w-5 p-0 text-xs">
              {[searchTerm, selectedSubject, selectedDeliveryType].filter(Boolean).length}
            </Badge>
          )}
        </Button>

        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={clearFilters} className="gap-2">
            <X className="h-4 w-4" />
            Clear all
          </Button>
        )}
      </div>

      {/* Filter Options */}
      {showFilters && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-secondary/30 rounded-lg animate-fade-in">
          <div>
            <label className="text-sm font-medium mb-2 block">Subject</label>
            <Select value={selectedSubject} onValueChange={handleSubjectChange}>
              <SelectTrigger>
                <SelectValue placeholder="All subjects" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All subjects</SelectItem>
                {subjects.map((subject) => (
                  <SelectItem key={subject} value={subject}>
                    {subject}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Delivery Type</label>
            <Select value={selectedDeliveryType} onValueChange={handleDeliveryTypeChange}>
              <SelectTrigger>
                <SelectValue placeholder="All types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All types</SelectItem>
                {deliveryTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      {/* Active Filters */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {searchTerm && (
            <Badge variant="secondary" className="gap-1">
              Search: {searchTerm}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => handleSearch("")}
              />
            </Badge>
          )}
          {selectedSubject && (
            <Badge variant="secondary" className="gap-1">
              Subject: {selectedSubject}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => handleSubjectChange("")}
              />
            </Badge>
          )}
          {selectedDeliveryType && (
            <Badge variant="secondary" className="gap-1">
              Type: {selectedDeliveryType}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => handleDeliveryTypeChange("")}
              />
            </Badge>
          )}
        </div>
      )}
    </div>
  );
};

export default FilterBar;