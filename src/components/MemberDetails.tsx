import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Phone, Mail, MapPin, Cake, Star, Trash2, Edit2, MessageSquare, AlertTriangle } from 'lucide-react';
import { FamilyMember } from '../types';
import { Button } from './ui/button';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";

interface MemberDetailsProps {
  member: FamilyMember | null;
  isOpen: boolean;
  onClose: () => void;
  onDelete: (id: string) => void;
  onEdit: (member: FamilyMember) => void;
}

export const MemberDetails: React.FC<MemberDetailsProps> = ({ 
  member, 
  isOpen, 
  onClose,
  onDelete,
  onEdit
}) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = React.useState(false);

  if (!member) return null;

  const handleDelete = () => {
    onDelete(member.id);
    setShowDeleteConfirm(false);
  };

  return (
    <>
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
              className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white rounded-t-[2.5rem] z-50 h-[85vh] flex flex-col shadow-2xl overflow-hidden"
            >
              <div className="px-6 py-4 flex justify-between items-center border-b border-slate-50 flex-shrink-0">
                <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
                  <X size={24} className="text-slate-400" />
                </Button>
                <div className="flex gap-1">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => onEdit(member)}
                    className="text-indigo-600 rounded-full"
                  >
                    <Edit2 size={20} />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => setShowDeleteConfirm(true)}
                    className="text-red-500 rounded-full"
                  >
                    <Trash2 size={20} />
                  </Button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto">
                <div className="p-8">
                  <div className="flex flex-col items-center mb-8">
                    <div className="relative mb-4 group">
                      <img
                        src={member.avatarUrl || `https://ui-avatars.com/api/?name=${member.firstName}+${member.lastName}&background=random`}
                        alt={`${member.firstName} ${member.lastName}`}
                        className="w-36 h-36 rounded-[2.5rem] object-cover ring-8 ring-indigo-50 shadow-xl"
                      />
                      {member.isEmergencyContact && (
                        <div className="absolute -top-2 -right-2 bg-red-600 text-white px-3 py-1 rounded-full text-[10px] font-black border-4 border-white shadow-lg flex items-center gap-1 uppercase tracking-tighter">
                          <Star size={10} fill="currentColor" /> SOS
                        </div>
                      )}
                    </div>
                    <h2 className="text-3xl font-black text-slate-900">{member.firstName} {member.lastName}</h2>
                    <span className="mt-2 px-6 py-1 bg-indigo-600 text-white text-xs font-bold rounded-full shadow-lg shadow-indigo-200">
                      {member.relation.toUpperCase()}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-3 mb-10">
                    <a href={`tel:${member.phoneNumber}`} className="flex flex-col items-center gap-2 p-4 bg-slate-50 rounded-[2rem] hover:bg-indigo-50 transition-all border border-transparent hover:border-indigo-100 active:scale-95 group">
                      <div className="p-3 bg-white rounded-2xl shadow-md text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                        <Phone size={24} />
                      </div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Call</span>
                    </a>
                    <a href={`mailto:${member.email}`} className="flex flex-col items-center gap-2 p-4 bg-slate-50 rounded-[2rem] hover:bg-indigo-50 transition-all border border-transparent hover:border-indigo-100 active:scale-95 group">
                      <div className="p-3 bg-white rounded-2xl shadow-md text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                        <Mail size={24} />
                      </div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Email</span>
                    </a>
                    <a href={`sms:${member.phoneNumber}`} className="flex flex-col items-center gap-2 p-4 bg-slate-50 rounded-[2rem] hover:bg-indigo-50 transition-all border border-transparent hover:border-indigo-100 active:scale-95 group">
                      <div className="p-3 bg-white rounded-2xl shadow-md text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                        <MessageSquare size={24} />
                      </div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Chat</span>
                    </a>
                  </div>

                  <div className="space-y-6">
                    <section>
                      <h3 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mb-4">Contact Info</h3>
                      <div className="space-y-5">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-500">
                            <Phone size={18} />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-slate-400">PHONE</p>
                            <p className="text-slate-800 font-semibold">{member.phoneNumber}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-500">
                            <Mail size={18} />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-slate-400">EMAIL</p>
                            <p className="text-slate-800 font-semibold truncate">{member.email}</p>
                          </div>
                        </div>

                        {member.address && (
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-500">
                              <MapPin size={18} />
                            </div>
                            <div>
                              <p className="text-xs font-bold text-slate-400">ADDRESS</p>
                              <p className="text-slate-800 font-semibold">{member.address}</p>
                            </div>
                          </div>
                        )}

                        {member.birthday && (
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-500">
                              <Cake size={18} />
                            </div>
                            <div>
                              <p className="text-xs font-bold text-slate-400">BIRTHDAY</p>
                              <p className="text-slate-800 font-semibold">
                                {new Date(member.birthday).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </section>

                    {member.notes && (
                      <section className="pt-4 border-t border-slate-50">
                        <h3 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mb-4">Personal Notes</h3>
                        <div className="bg-indigo-50/50 p-5 rounded-3xl border border-indigo-100">
                          <p className="text-indigo-900 text-sm leading-relaxed font-medium italic">"{member.notes}"</p>
                        </div>
                      </section>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AlertDialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <AlertDialogContent className="rounded-3xl max-w-[90vw] mx-auto">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-red-600">
              <AlertTriangle size={20} /> Remove Contact?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This will remove {member.firstName} from your family list forever. You can't undo this action.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-row gap-2 mt-4">
            <AlertDialogCancel className="flex-1 mt-0 rounded-xl">Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDelete}
              className="flex-1 bg-red-600 hover:bg-red-700 rounded-xl"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};