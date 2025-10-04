'use client'

import { useState } from 'react'
import { Search, ShoppingCart, Heart, Menu, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { useCartStore, useWishlistStore } from '@/lib/store'
import Link from 'next/link'

interface NavigationProps {
  searchTerm: string
  setSearchTerm: (term: string) => void
}

export default function Navigation({ searchTerm, setSearchTerm }: NavigationProps) {
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const { getTotalItems } = useCartStore()
  const { items: wishlistItems } = useWishlistStore()

  return (
    <header className="bg-white shadow-sm rounded-b-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="text-2xl font-bold text-gray-900 hidden sm:block">ShopNow</span>
          </Link>

          {/* Desktop Search */}
          <div className="flex-1 max-w-lg mx-8 hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-gray-50 border-gray-200 focus:bg-white"
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="md:flex  items-center space-x-4">
            <Link href="/wishlist">
              <Button variant="ghost" size="sm" className="relative">
                <Heart className="h-5 w-5" />
                {wishlistItems.length > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs h-5 w-5 flex items-center justify-center">
                    {wishlistItems.length}
                  </Badge>
                )}
              </Button>
            </Link>
            <Link href="/cart">
              <Button variant="ghost" size="sm" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {getTotalItems() > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs h-5 w-5 flex items-center justify-center">
                    {getTotalItems()}
                  </Badge>
                )}
              </Button>
            </Link>
            <Button className='hidden md:block' variant="ghost" size="sm">
              <User className="h-5 w-5" />
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-gray-50 border-gray-200 focus:bg-white"
            />
          </div>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="md:hidden border-t bg-white">
            <div className="px-4 py-4 space-y-4">
              <div className="flex items-center space-x-4">
                <Link href="/wishlist" className="flex-1">
                  <Button variant="ghost" size="sm" className="w-full relative">
                    <Heart className="h-5 w-5 mr-2" />
                    Wishlist
                    {wishlistItems.length > 0 && (
                      <Badge className="ml-2 bg-red-500 text-white text-xs">
                        {wishlistItems.length}
                      </Badge>
                    )}
                  </Button>
                </Link>
                <Link href="/cart" className="flex-1">
                  <Button variant="ghost" size="sm" className="w-full relative">
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Cart
                    {getTotalItems() > 0 && (
                      <Badge className="ml-2 bg-red-500 text-white text-xs">
                        {getTotalItems()}
                      </Badge>
                    )}
                  </Button>
                </Link>
              </div>
              <Button variant="ghost" size="sm" className="w-full">
                <User className="h-5 w-5 mr-2" />
                Account
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
