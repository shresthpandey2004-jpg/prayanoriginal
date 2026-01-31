import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Clock, Users, ChefHat, Star, Filter, Heart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SEOHead from '@/components/seo/SEOHead';
import { 
  recipes, 
  getFeaturedRecipes, 
  getRecipeCategories, 
  searchRecipes,
  getRecipesByCategory,
  getRecipesByDifficulty,
  getRecipesByRegion
} from '@/data/recipes';

const Recipes = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  
  const categories = ['All', ...getRecipeCategories()];
  const difficulties = ['All', 'Easy', 'Medium', 'Hard'];
  const regions = ['All', 'North India', 'South India', 'Pan-Indian', 'Hyderabad/Lucknow'];
  const featuredRecipes = getFeaturedRecipes();
  
  // Filter recipes based on search and filters
  let filteredRecipes = recipes;
  
  if (searchTerm) {
    filteredRecipes = searchRecipes(searchTerm);
  }
  
  if (selectedCategory !== 'All') {
    filteredRecipes = filteredRecipes.filter(recipe => recipe.category === selectedCategory);
  }
  
  if (selectedDifficulty !== 'All') {
    filteredRecipes = filteredRecipes.filter(recipe => recipe.difficulty === selectedDifficulty);
  }
  
  if (selectedRegion !== 'All') {
    filteredRecipes = filteredRecipes.filter(recipe => recipe.region === selectedRegion);
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setSelectedDifficulty('All');
    setSelectedRegion('All');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <SEOHead 
        title="Authentic Indian Recipes with Organic Spices | Prayan Masale"
        description="Discover traditional Indian recipes made with Prayan Masale's organic spices. From Dal Tadka to Biryani, learn to cook authentic flavors at home."
        keywords="indian recipes, authentic recipes, organic spices recipes, dal tadka, chicken curry, biryani recipe, traditional cooking, spice recipes"
        url={typeof window !== 'undefined' ? window.location.href : undefined}
        type="website"
      />
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            Authentic Indian Recipes
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the art of traditional Indian cooking with our curated collection of recipes. 
            Each dish is crafted with Prayan Masale's premium organic spices for authentic flavors.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between mb-4">
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Search recipes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2"
              >
                <Filter className="w-4 h-4" />
                Filters
              </Button>
              {(selectedCategory !== 'All' || selectedDifficulty !== 'All' || selectedRegion !== 'All' || searchTerm) && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearFilters}
                >
                  Clear All
                </Button>
              )}
            </div>
          </div>

          {/* Filter Options */}
          {showFilters && (
            <div className="bg-white p-4 rounded-lg shadow-md mb-6">
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
                  <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      {difficulties.map(difficulty => (
                        <SelectItem key={difficulty} value={difficulty}>
                          {difficulty}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Region</label>
                  <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select region" />
                    </SelectTrigger>
                    <SelectContent>
                      {regions.map(region => (
                        <SelectItem key={region} value={region}>
                          {region}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}

          {/* Quick Category Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.slice(0, 6).map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? "bg-orange-600 hover:bg-orange-700" : ""}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Featured Recipes */}
        {featuredRecipes.length > 0 && selectedCategory === 'All' && !searchTerm && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <Star className="w-6 h-6 mr-2 text-orange-600" />
              Featured Recipes
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredRecipes.map(recipe => (
                <Card key={recipe.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
                  <div className="relative">
                    <img 
                      src={recipe.image} 
                      alt={recipe.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop';
                      }}
                    />
                    <Badge className="absolute top-3 left-3 bg-orange-600">
                      <Star className="w-3 h-3 mr-1" />
                      Featured
                    </Badge>
                    <Badge className={`absolute top-3 right-3 ${getDifficultyColor(recipe.difficulty)}`}>
                      {recipe.difficulty}
                    </Badge>
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-bold text-gray-800 line-clamp-1">
                      {recipe.title}
                    </CardTitle>
                    <p className="text-orange-600 font-medium text-sm">
                      {recipe.titleHindi}
                    </p>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {recipe.description}
                    </p>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {recipe.totalTime}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {recipe.servings} servings
                      </div>
                      <div className="flex items-center gap-1">
                        <ChefHat className="w-4 h-4" />
                        {recipe.region}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className="text-xs">
                        {recipe.category}
                      </Badge>
                      <Link 
                        to={`/recipe/${recipe.slug}`}
                        className="text-orange-600 hover:text-orange-700 font-medium text-sm"
                      >
                        View Recipe →
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* All Recipes */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {searchTerm ? `Search Results (${filteredRecipes.length})` : 
             selectedCategory === 'All' ? 'All Recipes' : `${selectedCategory} Recipes`}
          </h2>
          
          {filteredRecipes.length === 0 ? (
            <div className="text-center py-12">
              <ChefHat className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 text-lg mb-4">
                {searchTerm ? 'No recipes found matching your search.' : 'No recipes found with current filters.'}
              </p>
              <Button onClick={clearFilters} className="bg-orange-600 hover:bg-orange-700">
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRecipes.map(recipe => (
                <Card key={recipe.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
                  <div className="relative">
                    <img 
                      src={recipe.image} 
                      alt={recipe.title}
                      className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=250&fit=crop';
                      }}
                    />
                    <Badge className={`absolute top-3 right-3 ${getDifficultyColor(recipe.difficulty)}`}>
                      {recipe.difficulty}
                    </Badge>
                    {recipe.featured && (
                      <Badge className="absolute top-3 left-3 bg-orange-600">
                        <Star className="w-3 h-3 mr-1" />
                        Featured
                      </Badge>
                    )}
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-bold text-gray-800 line-clamp-1">
                      {recipe.title}
                    </CardTitle>
                    <p className="text-orange-600 font-medium text-sm">
                      {recipe.titleHindi}
                    </p>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {recipe.description}
                    </p>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {recipe.totalTime}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {recipe.servings}
                      </div>
                    </div>
                    <div className="flex items-center justify-between mb-3">
                      <Badge variant="secondary" className="text-xs">
                        {recipe.category}
                      </Badge>
                      <span className="text-xs text-gray-500">{recipe.region}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-1">
                        {recipe.tags.slice(0, 2).map(tag => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <Link 
                        to={`/recipe/${recipe.slug}`}
                        className="text-orange-600 hover:text-orange-700 font-medium text-sm"
                      >
                        View Recipe →
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Recipe Categories Section */}
        <div className="mt-16 bg-white rounded-lg p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Explore Recipe Categories
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {getRecipeCategories().map(category => {
              const categoryRecipes = getRecipesByCategory(category);
              const categoryIcons = {
                'Main Course': '🍛',
                'Vegetable': '🥬',
                'Rice & Biryani': '🍚',
                'Snacks': '🍿',
                'Desserts': '🍮',
                'Beverages': '🥤'
              };
              
              return (
                <div 
                  key={category}
                  className="text-center p-4 rounded-lg border hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => setSelectedCategory(category)}
                >
                  <div className="text-4xl mb-3">
                    {categoryIcons[category as keyof typeof categoryIcons] || '🍽️'}
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">{category}</h3>
                  <p className="text-sm text-gray-600">
                    {categoryRecipes.length} recipe{categoryRecipes.length !== 1 ? 's' : ''}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-16 bg-gradient-to-r from-orange-600 to-red-600 rounded-lg p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">
            Get New Recipes Weekly!
          </h3>
          <p className="mb-6 text-orange-100">
            Subscribe to receive authentic Indian recipes and cooking tips using Prayan Masale's organic spices.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input 
              type="email" 
              placeholder="Enter your email"
              className="flex-1 text-gray-800"
            />
            <Button className="bg-white text-orange-600 hover:bg-gray-100">
              Subscribe
            </Button>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Recipes;