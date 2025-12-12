"use client"
import React, { createContext, useContext } from "react"

interface TabsContextType {
  value: string
  onValueChange: (value: string) => void
}

const TabsContext = createContext<TabsContextType | undefined>(undefined)

export const Tabs = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { value: string; onValueChange: (value: string) => void }
>(({ className, value, onValueChange, children, ...props }, ref) => (
  <TabsContext.Provider value={{ value, onValueChange }}>
    <div ref={ref} className={className} {...props}>
      {children}
    </div>
  </TabsContext.Provider>
))
Tabs.displayName = "Tabs"

export const TabsList = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={`inline-flex h-10 items-center justify-center rounded-md bg-gray-100 p-1 text-gray-500 ${className || ""}`}
    {...props}
  />
))
TabsList.displayName = "TabsList"

export const TabsTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { value: string }
>(({ className, value, onClick, ...props }, ref) => {
  const context = useContext(TabsContext)
  if (!context) throw new Error("TabsTrigger must be used within Tabs")
  
  const isActive = context.value === value
  
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    context.onValueChange(value)
    onClick?.(e)
  }
  
  const getActiveStyles = () => {
    if (!isActive) return "hover:bg-gray-200"
    
    if (value === "patient") {
      return "bg-blue-500 text-white shadow-sm"
    }
    if (value === "pharmacist") {
      return "bg-green-500 text-white shadow-sm"
    }
    return "bg-white text-gray-950 shadow-sm"
  }
  
  return (
    <button
      ref={ref}
      type="button"
      onClick={handleClick}
      className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 ${
        getActiveStyles()
      } ${className || ""}`}
      {...props}
    />
  )
})
TabsTrigger.displayName = "TabsTrigger"