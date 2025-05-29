import React, { useState, useEffect, useCallback } from 'react';
import { TravelPackage } from '../../types';
import LoadingSpinner from '../../components/LoadingSpinner';
import { getTours, createTourAdmin, updateTourAdmin, deleteTourAdmin } from '../../apiService';

const AdminPackages: React.FC = () => {
  const [packages, setPackages] = useState<TravelPackage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPackage, setEditingPackage] = useState<TravelPackage | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const initialFormData: Omit<TravelPackage, 'id' | 'rating' | 'reviews' | 'reviewCount'> & Partial<Pick<TravelPackage, 'id' | 'rating' | 'reviews' | 'reviewCount'>> = { 
      name: '', 
      destination: '', 
      region: '',
      duration: 7, 
      price: 15000, 
      description: '', 
      longDescription: '',
      imageUrl: '',
      activities: [], 
      whatsIncluded: [],
      bestTimeToVisit: '',
      featured: false,
      imageUrls: [],
  };
  const [formData, setFormData] = useState<Partial<TravelPackage>>(initialFormData);

  const fetchAdminPackages = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getTours();
      const mappedPackages = response.data.map((pkg: any) => ({ ...pkg, id: pkg._id }));
      setPackages(mappedPackages.sort((a: TravelPackage, b: TravelPackage) => a.name.localeCompare(b.name)));
    } catch (err: any) {
      console.error("Failed to fetch packages for admin:", err);
      setError(err.response?.data?.message || "Could not load packages.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAdminPackages();
  }, [fetchAdminPackages]);

  const openModal = (pkg: TravelPackage | null = null) => {
    setEditingPackage(pkg);
    if (pkg) {
      const fullPkgData = { ...initialFormData, ...pkg };
      setFormData(fullPkgData);
    } else {
      setFormData({ ...initialFormData, imageUrl: `https://picsum.photos/seed/${Math.random().toString(36).substring(7)}/600/400` });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingPackage(null);
    setFormData(initialFormData); 
    setIsSubmitting(false);
  };

  const handleChange = <K extends keyof Partial<TravelPackage>>(key: K, value: Partial<TravelPackage>[K]) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };
  
  const handleStringArrayChange = (key: 'activities' | 'whatsIncluded', value: string) => {
      const items = value.split(',').map(item => item.trim()).filter(item => item !== '');
       handleChange(key, items as any);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!formData.name || !formData.destination || (formData.duration || 0) <= 0 || (formData.price || 0) < 0 || !formData.imageUrl) {
        alert("Required: Name, Destination, Image URL. Duration > 0, Price >= 0.");
        return;
    }
    setIsSubmitting(true);
    setError(null);

    const dataToSubmit: Partial<Omit<TravelPackage, 'id' | 'reviews' | 'rating' | 'reviewCount'>> = {
        name: formData.name,
        destination: formData.destination,
        region: formData.region,
        duration: formData.duration,
        price: formData.price,
        description: formData.description,
        longDescription: formData.longDescription,
        imageUrl: formData.imageUrl,
        activities: formData.activities,
        whatsIncluded: formData.whatsIncluded,
        bestTimeToVisit: formData.bestTimeToVisit,
        featured: formData.featured,
        imageUrls: formData.imageUrls,
    };
    
    try {
        if (editingPackage && editingPackage.id) {
            await updateTourAdmin(editingPackage.id, dataToSubmit);
        } else {
            await createTourAdmin(dataToSubmit);
        }
        await fetchAdminPackages();
        closeModal();
    } catch (e: any) {
        console.error("Submission failed", e);
        setError(e.response?.data?.message || e.response?.data?.errors?.map((err:any) => err.msg).join(', ') || "An error occurred while saving the package.");
    } finally {
        setIsSubmitting(false);
    }
  };

  const handleDeletePackage = async (packageId: string) => {
    if (window.confirm('Are you sure you want to delete this package? This action cannot be undone.')) {
      setIsSubmitting(true);
      setError(null);
      try {
        await deleteTourAdmin(packageId);
        await fetchAdminPackages();
      } catch (e: any) {
        console.error("Delete failed", e);
        setError(e.response?.data?.message || "Failed to delete package.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };
  
  const inputBaseClass = "mt-1 block w-full p-2.5 border border-neutral-darkest/30 rounded-lg shadow-sm focus:ring-2 focus:ring-primary focus:border-transparent transition-colors";

  if (isLoading && packages.length === 0) { 
    return <div className="flex items-center justify-center min-h-[60vh]"><LoadingSpinner message="Loading packages..." size="lg"/></div>;
  }

  return (
    <div className="p-4 md:p-6 space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>
            <h1 className="text-3xl font-display font-bold text-primary">Manage Packages</h1>
            <p className="text-text-light mt-1">Add, edit, or remove travel packages offered.</p>
        </div>
        <button
          onClick={() => openModal()}
          className="bg-accent hover:bg-accent-dark text-primary font-semibold py-3 px-6 rounded-lg transition-colors duration-300 shadow-md hover:shadow-lg flex items-center focus:outline-none focus:ring-4 focus:ring-accent/50 focus:ring-offset-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-2">
            <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
          </svg>
          Add New Package
        </button>
      </div>

      {isSubmitting && <div className="my-4"><LoadingSpinner message={isSubmitting ? "Saving changes..." : "Loading packages..."} /></div>}
      {error && <p className="my-4 text-center text-red-500 p-2 bg-red-100 border border-red-300 rounded-md">Error: {error}</p>}

      <div className="bg-white shadow-lg rounded-xl overflow-x-auto border border-neutral-light/50">
        <table className="w-full min-w-[800px] text-sm text-left text-text">
          <thead className="text-xs text-text-dark uppercase bg-neutral-lightest border-b border-neutral-light">
            <tr>
              <th scope="col" className="px-6 py-4">Name</th>
              <th scope="col" className="px-6 py-4">Destination</th>
              <th scope="col" className="px-6 py-4">Region</th>
              <th scope="col" className="px-6 py-4 text-right">Price (₹)</th>
              <th scope="col" className="px-6 py-4 text-center">Duration (Days)</th>
              <th scope="col" className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {packages.map((pkg) => (
              <tr key={pkg.id} className="bg-white border-b border-neutral-light hover:bg-neutral-lightest/60 transition-colors duration-150">
                <td className="px-6 py-4 font-medium text-text whitespace-nowrap">{pkg.name}</td>
                <td className="px-6 py-4">{pkg.destination}</td>
                <td className="px-6 py-4">{pkg.region || <span className="text-neutral-dark italic">N/A</span>}</td>
                <td className="px-6 py-4 text-right">₹{pkg.price.toLocaleString()}</td>
                <td className="px-6 py-4 text-center">{pkg.duration}</td>
                <td className="px-6 py-4 text-center space-x-3">
                  <button onClick={() => openModal(pkg)} className="font-medium text-primary hover:text-secondary transition-colors duration-150 px-2 py-1 rounded-md hover:bg-primary/10">Edit</button>
                  <button onClick={() => handleDeletePackage(pkg.id)} className="font-medium text-error hover:text-red-700 transition-colors duration-150 px-2 py-1 rounded-md hover:bg-error/10">Delete</button>
                </td>
              </tr>
            ))}
             {packages.length === 0 && !isLoading && !error && (
                <tr>
                    <td colSpan={6} className="text-center py-10 text-text-light italic">
                        No packages found. Add a new package to get started!
                    </td>
                </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-[60] p-4 transition-opacity duration-300"
             onClick={closeModal}
        >
          <div className="bg-white rounded-xl shadow-2xl p-6 md:p-8 w-full max-w-3xl max-h-[90vh] overflow-y-auto scrollbar-thin scrollbar-thumb-neutral scrollbar-track-neutral-lightest"
               onClick={(e) => e.stopPropagation()} 
          >
            <div className="flex justify-between items-center mb-6 pb-3 border-b border-neutral-light">
                <h2 className="text-2xl font-display font-semibold text-primary">{editingPackage ? 'Edit' : 'Add New'} Package</h2>
                <button onClick={closeModal} className="text-neutral-dark hover:text-error transition-colors p-1 rounded-full hover:bg-neutral-light" aria-label="Close modal">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="pkgName" className="block text-sm font-medium text-text-dark mb-1">Name <span className="text-red-500">*</span></label>
                  <input type="text" id="pkgName" value={formData.name || ''} onChange={(e) => handleChange('name', e.target.value)} required className={inputBaseClass}/>
                </div>
                <div>
                  <label htmlFor="pkgDest" className="block text-sm font-medium text-text-dark mb-1">Destination(s) <span className="text-red-500">*</span></label>
                  <input type="text" id="pkgDest" value={formData.destination || ''} onChange={(e) => handleChange('destination', e.target.value)} required className={inputBaseClass}/>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="pkgRegion" className="block text-sm font-medium text-text-dark mb-1">Region (e.g., Meghalaya)</label>
                  <input type="text" id="pkgRegion" value={formData.region || ''} onChange={(e) => handleChange('region', e.target.value)} className={inputBaseClass}/>
                </div>
                 <div>
                  <label htmlFor="pkgBestTime" className="block text-sm font-medium text-text-dark mb-1">Best Time to Visit</label>
                  <input type="text" id="pkgBestTime" value={formData.bestTimeToVisit || ''} onChange={(e) => handleChange('bestTimeToVisit', e.target.value)} className={inputBaseClass}/>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div>
                  <label htmlFor="pkgDuration" className="block text-sm font-medium text-text-dark mb-1">Duration (days) <span className="text-red-500">*</span></label>
                  <input type="number" id="pkgDuration" value={formData.duration || 0} onChange={(e) => handleChange('duration', parseInt(e.target.value))} required min="1" className={inputBaseClass}/>
                </div>
                <div>
                  <label htmlFor="pkgPrice" className="block text-sm font-medium text-text-dark mb-1">Price (₹) <span className="text-red-500">*</span></label>
                  <input type="number" id="pkgPrice" value={formData.price || 0} onChange={(e) => handleChange('price', parseFloat(e.target.value))} required min="0" step="100" className={inputBaseClass}/>
                </div>
              </div>
              <div>
                <label htmlFor="pkgDesc" className="block text-sm font-medium text-text-dark mb-1">Short Description</label>
                <textarea id="pkgDesc" value={formData.description || ''} onChange={(e) => handleChange('description', e.target.value)} rows={2} className={inputBaseClass}></textarea>
              </div>
              <div>
                <label htmlFor="pkgLongDesc" className="block text-sm font-medium text-text-dark mb-1">Long Description (HTML supported)</label>
                <textarea id="pkgLongDesc" value={formData.longDescription || ''} onChange={(e) => handleChange('longDescription', e.target.value)} rows={4} className={inputBaseClass}></textarea>
              </div>
              <div>
                <label htmlFor="pkgImageUrl" className="block text-sm font-medium text-text-dark mb-1">Image URL <span className="text-red-500">*</span></label>
                <input type="url" id="pkgImageUrl" value={formData.imageUrl || ''} onChange={(e) => handleChange('imageUrl', e.target.value)} required placeholder="https://example.com/image.jpg" className={inputBaseClass}/>
              </div>
              <div>
                <label className="block text-sm font-medium text-text-dark mb-1">Gallery Images</label>
                {(formData.imageUrls || []).map((url, idx) => (
                  <div key={idx} className="flex items-center mb-2">
                    <input
                      type="url"
                      value={url}
                      onChange={e => {
                        const newUrls = [...(formData.imageUrls || [])];
                        newUrls[idx] = e.target.value;
                        handleChange('imageUrls', newUrls);
                      }}
                      placeholder="https://example.com/gallery-image.jpg"
                      className={inputBaseClass + ' flex-1'}
                    />
                    <button type="button" onClick={() => {
                      const newUrls = [...(formData.imageUrls || [])];
                      newUrls.splice(idx, 1);
                      handleChange('imageUrls', newUrls);
                    }} className="ml-2 px-2 py-1 text-xs bg-error text-white rounded hover:bg-red-700">Remove</button>
                  </div>
                ))}
                <button type="button" onClick={() => handleChange('imageUrls', [...(formData.imageUrls || []), ''])} className="mt-2 px-3 py-1 text-xs bg-primary text-white rounded hover:bg-secondary">Add Image</button>
                <p className="text-xs text-text-light mt-1">These images will appear in the gallery on the package details page.</p>
              </div>
              <div>
                <label htmlFor="pkgActivities" className="block text-sm font-medium text-text-dark mb-1">Activities (comma-separated)</label>
                <input type="text" id="pkgActivities" value={Array.isArray(formData.activities) ? formData.activities.join(', ') : ''} onChange={(e) => handleStringArrayChange('activities', e.target.value)} className={inputBaseClass}/>
              </div>
              <div>
                <label htmlFor="pkgWhatsIncluded" className="block text-sm font-medium text-text-dark mb-1">What's Included (comma-separated)</label>
                <input type="text" id="pkgWhatsIncluded" value={Array.isArray(formData.whatsIncluded) ? formData.whatsIncluded.join(', ') : ''} onChange={(e) => handleStringArrayChange('whatsIncluded', e.target.value)} className={inputBaseClass}/>
              </div>
              <div className="flex justify-end space-x-4 pt-5 mt-3 border-t border-neutral-light">
                <button type="button" onClick={closeModal} className="py-2.5 px-5 border border-neutral-darkest/50 rounded-lg text-sm font-medium text-text-dark hover:bg-neutral-lightest focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-neutral-darkest transition-colors">Cancel</button>
                <button type="submit" disabled={isSubmitting || isLoading} className="py-2.5 px-5 bg-primary hover:bg-secondary text-white rounded-lg text-sm font-medium shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-primary transition-colors disabled:opacity-70 flex items-center">
                 {(isSubmitting || isLoading) && <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>}
                {editingPackage ? 'Save Changes' : 'Add Package'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPackages;
