import React, { useState, useMemo } from 'react';
import { Toaster, toast } from 'sonner';
import { Search, Plus, Star, Users, Heart, Phone, Mail, MapPin } from 'lucide-react';
import { MobileContainer } from './components/layout/MobileContainer';
import { mockFamilyMembers } from './data/mockData';
import { FamilyMember } from './types';
import { FamilyMemberCard } from './components/FamilyMemberCard';
import { MemberDetails } from './components/MemberDetails';
import { MemberForm } from './components/MemberForm';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';

const App: React.FC = () => {
  const [members, setMembers] = useState<FamilyMember[]>(mockFamilyMembers);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMember, setSelectedMember] = useState<FamilyMember | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<FamilyMember | null>(null);

  const emergencyContacts = members.filter(m => m.isEmergencyContact);
  
  const filteredMembers = useMemo(() => {
    return members.filter(m => 
      `${m.firstName} ${m.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.relation.toLowerCase().includes(searchQuery.toLowerCase())
    ).sort((a, b) => a.firstName.localeCompare(b.firstName));
  }, [members, searchQuery]);

  const handleMemberClick = (member: FamilyMember) => {
    setSelectedMember(member);
    setIsDetailsOpen(true);
  };

  const handleAddMember = (data: Partial<FamilyMember>) => {
    const newMember: FamilyMember = {
      ...data as FamilyMember,
      id: Math.random().toString(36).substr(2, 9),
      // Default avatar if none provided
      avatarUrl: data.avatarUrl || `https://ui-avatars.com/api/?name=${data.firstName}+${data.lastName}&background=random`
    };
    setMembers(prev => [...prev, newMember]);
    toast.success(`${newMember.firstName} added!`);
    setIsFormOpen(false);
  };

  const handleUpdateMember = (data: Partial<FamilyMember>) => {
    if (!editingMember) return;
    const updated = { ...editingMember, ...data };
    setMembers(prev => prev.map(m => m.id === editingMember.id ? updated : m));
    if (selectedMember?.id === editingMember.id) {
      setSelectedMember(updated);
    }
    toast.success('Contact updated');
    setIsFormOpen(false);
  };

  const handleDeleteMember = (id: string) => {
    setMembers(prev => prev.filter(m => m.id !== id));
    setIsDetailsOpen(false);
    toast.info('Member removed');
  };

  const openEdit = (member: FamilyMember) => {
    setEditingMember(member);
    setIsFormOpen(true);
  };

  const openAdd = () => {
    setEditingMember(null);
    setIsFormOpen(true);
  };

  return (
    <MobileContainer>
      <Toaster position="top-center" />
      
      {/* Header */}
      <header className="px-6 pt-10 pb-6 bg-white sticky top-0 z-30 shadow-sm border-b">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
              <Users className="text-indigo-600" size={28} /> FamilyHub
            </h1>
            <p className="text-slate-500 text-xs font-medium tracking-tight">KEEPING KIN CLOSE</p>
          </div>
          <Button
            size="icon"
            className="w-12 h-12 bg-indigo-600 text-white rounded-2xl flex items-center justify-center shadow-lg hover:bg-indigo-700 active:scale-95 transition-all"
            onClick={openAdd}
          >
            <Plus size={24} />
          </Button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <Input
            type="text"
            placeholder="Search family member..."
            className="w-full bg-slate-50 border-none rounded-2xl py-6 pl-12 pr-4 focus-visible:ring-2 focus-visible:ring-indigo-500 transition-all outline-none text-slate-700"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-6 pb-24 overflow-y-auto pt-6 bg-slate-50/50">
        {/* Emergency Section */}
        {emergencyContacts.length > 0 && searchQuery === '' && (
          <section className="mb-8">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <Star size={14} className="text-red-500 fill-red-500" /> SOS Contacts
            </h2>
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-2 px-2">
              {emergencyContacts.map(member => (
                <motion.div
                  key={member.id}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleMemberClick(member)}
                  className="flex-shrink-0 w-24 text-center cursor-pointer"
                >
                  <div className="relative mb-2 group">
                    <img
                      src={member.avatarUrl}
                      alt={member.firstName}
                      className="w-20 h-20 rounded-2xl object-cover ring-2 ring-red-100 p-0.5 mx-auto shadow-md transition-transform group-active:scale-90"
                    />
                    <div className="absolute -bottom-1 -right-1 bg-red-500 p-1.5 rounded-lg text-white shadow-sm border-2 border-white">
                      <Phone size={12} />
                    </div>
                  </div>
                  <p className="text-xs font-bold text-slate-800 truncate">{member.firstName}</p>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* All Family List */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
               Family Members
            </h2>
            <span className="text-[10px] font-bold bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full">
              {filteredMembers.length} TOTAL
            </span>
          </div>

          {filteredMembers.length > 0 ? (
            <div className="space-y-1">
              {filteredMembers.map(member => (
                <FamilyMemberCard 
                  key={member.id} 
                  member={member} 
                  onClick={handleMemberClick} 
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="bg-slate-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search size={32} className="text-slate-300" />
              </div>
              <p className="text-slate-500 font-medium">No results for "{searchQuery}"</p>
              <Button 
                variant="link"
                onClick={() => setSearchQuery('')}
                className="text-indigo-600 font-bold mt-2"
              >
                Clear filters
              </Button>
            </div>
          )}
        </section>
      </main>

      {/* Modals */}
      <MemberDetails
        member={selectedMember}
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        onDelete={handleDeleteMember}
        onEdit={openEdit}
      />

      <MemberForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={editingMember ? handleUpdateMember : handleAddMember}
        initialData={editingMember}
      />

      {/* Bottom Floating Message */}
      <AnimatePresence>
        {filteredMembers.length > 0 && (
          <motion.div 
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-20 pointer-events-none"
          >
            <div className="bg-slate-900 text-white px-6 py-3 rounded-full flex items-center gap-3 shadow-2xl pointer-events-auto border border-slate-700">
              <Heart size={18} className="text-red-400 fill-red-400" />
              <span className="text-xs font-bold uppercase tracking-wider">Bonded Forever</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </MobileContainer>
  );
};

export default App;