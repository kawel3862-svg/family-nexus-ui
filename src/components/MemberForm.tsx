import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Phone, Mail, MapPin, Cake, Star, FileText } from 'lucide-react';
import { FamilyMember, RelationType } from '../types';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Checkbox } from './ui/checkbox';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from './ui/select';

interface MemberFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (member: Partial<FamilyMember>) => void;
  initialData?: FamilyMember | null;
}

const relations: RelationType[] = [
  'Parent', 'Sibling', 'Grandparent', 'Child', 'Spouse', 'Uncle/Aunt', 'Cousin', 'In-law', 'Other'
];

export const MemberForm: React.FC<MemberFormProps> = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState<Partial<FamilyMember>>({
    firstName: '',
    lastName: '',
    relation: 'Other',
    phoneNumber: '',
    email: '',
    address: '',
    birthday: '',
    notes: '',
    isEmergencyContact: false
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        firstName: '',
        lastName: '',
        relation: 'Other',
        phoneNumber: '',
        email: '',
        address: '',
        birthday: '',
        notes: '',
        isEmergencyContact: false
      });
    }
  }, [initialData, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white rounded-t-[2rem] z-50 h-[92vh] flex flex-col shadow-2xl overflow-hidden"
          >
            <div className="px-6 py-4 flex justify-between items-center border-b border-slate-100 flex-shrink-0">
              <h2 className="text-xl font-bold text-slate-900">
                {initialData ? 'Edit Details' : 'Add New Member'}
              </h2>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={onClose} 
                className="rounded-full h-10 w-10"
              >
                <X size={24} className="text-slate-500" />
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto">
              <form onSubmit={handleSubmit} className="p-6 space-y-6 pb-24">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-slate-700 font-bold">First Name</Label>
                    <div className="relative">
                      <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <Input
                        required
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className="pl-10 h-12 bg-slate-50 border-slate-200 rounded-xl"
                        placeholder="John"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-700 font-bold">Last Name</Label>
                    <Input
                      required
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="h-12 bg-slate-50 border-slate-200 rounded-xl"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-slate-700 font-bold">Relation</Label>
                  <Select 
                    value={formData.relation} 
                    onValueChange={(val) => setFormData({ ...formData, relation: val })}
                  >
                    <SelectTrigger className="h-12 bg-slate-50 border-slate-200 rounded-xl">
                      <SelectValue placeholder="Select relationship" />
                    </SelectTrigger>
                    <SelectContent>
                      {relations.map(rel => (
                        <SelectItem key={rel} value={rel}>{rel}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-slate-700 font-bold">Phone Number</Label>
                  <div className="relative">
                    <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <Input
                      required
                      type="tel"
                      value={formData.phoneNumber}
                      onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                      className="pl-10 h-12 bg-slate-50 border-slate-200 rounded-xl"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-slate-700 font-bold">Email</Label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="pl-10 h-12 bg-slate-50 border-slate-200 rounded-xl"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-slate-700 font-bold">Home Address</Label>
                  <div className="relative">
                    <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <Input
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="pl-10 h-12 bg-slate-50 border-slate-200 rounded-xl"
                      placeholder="123 Family St"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-slate-700 font-bold">Birthday</Label>
                  <div className="relative">
                    <Cake size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <Input
                      type="date"
                      value={formData.birthday}
                      onChange={(e) => setFormData({ ...formData, birthday: e.target.value })}
                      className="pl-10 h-12 bg-slate-50 border-slate-200 rounded-xl"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-slate-700 font-bold">Notes</Label>
                  <Textarea
                    rows={3}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="bg-slate-50 border-slate-200 rounded-xl resize-none"
                    placeholder="Important information..."
                  />
                </div>

                <div className="flex items-center space-x-3 p-4 bg-red-50/50 rounded-2xl border border-red-100">
                  <Checkbox 
                    id="emergency" 
                    checked={formData.isEmergencyContact}
                    onCheckedChange={(checked) => setFormData({ ...formData, isEmergencyContact: checked as boolean })}
                  />
                  <div className="flex-1 grid leading-none">
                    <Label 
                      htmlFor="emergency" 
                      className="text-sm font-bold text-red-700 cursor-pointer"
                    >
                      Emergency SOS Contact
                    </Label>
                    <p className="text-[10px] text-red-500 font-medium">Prioritize this member in case of emergencies</p>
                  </div>
                  <Star size={18} className={formData.isEmergencyContact ? "fill-red-500 text-red-500" : "text-red-300"} />
                </div>
              </form>
            </div>

            <div className="p-6 bg-white border-t border-slate-100 sticky bottom-0 flex-shrink-0">
              <Button
                type="submit"
                onClick={handleSubmit}
                className="w-full h-14 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-lg rounded-2xl shadow-xl shadow-indigo-100 transition-all active:scale-[0.98]"
              >
                {initialData ? 'Update Member' : 'Add to Family'}
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};