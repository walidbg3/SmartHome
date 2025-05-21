"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PlusCircle, Edit, Trash2, Users, BadgeInfo } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useLanguage } from '@/contexts/language-context';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  status: 'active' | 'invited' | 'suspended';
  lastLogin?: string;
  avatarUrl?: string;
}

const initialUsers: User[] = [
  { id: '1', name: 'Alice Wonderland', email: 'alice@example.com', role: 'admin', status: 'active', lastLogin: '2023-10-26 10:00', avatarUrl: 'https://placehold.co/40x40.png?text=AW' },
  { id: '2', name: 'Bob The Builder', email: 'bob@example.com', role: 'user', status: 'active', lastLogin: '2023-10-25 15:30', avatarUrl: 'https://placehold.co/40x40.png?text=BB' },
  { id: '3', name: 'Charlie Brown', email: 'charlie@example.com', role: 'user', status: 'invited', avatarUrl: 'https://placehold.co/40x40.png?text=CB' },
  { id: '4', name: 'Diana Prince', email: 'diana@example.com', role: 'user', status: 'suspended', lastLogin: '2023-09-10 12:00', avatarUrl: 'https://placehold.co/40x40.png?text=DP' },
];

// Sample translations (replace with a proper i18n system)
const translations: Record<string, Record<string, string>> = {
  en: {
    title: "User Management",
    description: "Manage users, roles, and permissions for Nexus Hub.",
    addUser: "Add New User",
    name: "Name",
    email: "Email",
    role: "Role",
    status: "Status",
    lastLogin: "Last Login",
    actions: "Actions",
    admin: "Admin",
    user: "User",
    active: "Active",
    invited: "Invited",
    suspended: "Suspended",
    never: "Never",
    saveUser: "Save User",
    cancel: "Cancel",
    editUser: "Edit User",
    inviteUser: "Invite User",
    confirmDelete: "Are you sure you want to delete this user?",
    delete: "Delete",
  },
  fr: {
    title: "Gestion des Utilisateurs",
    description: "Gérez les utilisateurs, les rôles et les permissions pour Nexus Hub.",
    addUser: "Ajouter un Utilisateur",
    name: "Nom",
    email: "Email",
    role: "Rôle",
    status: "Statut",
    lastLogin: "Dernière Connexion",
    actions: "Actions",
    admin: "Admin",
    user: "Utilisateur",
    active: "Actif",
    invited: "Invité",
    suspended: "Suspendu",
    never: "Jamais",
    saveUser: "Enregistrer",
    cancel: "Annuler",
    editUser: "Modifier l'Utilisateur",
    inviteUser: "Inviter un Utilisateur",
    confirmDelete: "Êtes-vous sûr de vouloir supprimer cet utilisateur ?",
    delete: "Supprimer",
  },
  ar: {
    title: "إدارة المستخدمين",
    description: "إدارة المستخدمين والأدوار والأذونات في نيكسس هاب.",
    addUser: "إضافة مستخدم جديد",
    name: "الاسم",
    email: "البريد الإلكتروني",
    role: "الدور",
    status: "الحالة",
    lastLogin: "آخر تسجيل دخول",
    actions: "الإجراءات",
    admin: "مسؤول",
    user: "مستخدم",
    active: "نشط",
    invited: "مدعو",
    suspended: "معلق",
    never: "أبدًا",
    saveUser: "حفظ المستخدم",
    cancel: "إلغاء",
    editUser: "تعديل المستخدم",
    inviteUser: "دعوة مستخدم",
    confirmDelete: "هل أنت متأكد أنك تريد حذف هذا المستخدم؟",
    delete: "حذف",
  },
};

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const { currentLanguage } = useLanguage();
  const t = (key: string) => translations[currentLanguage.code]?.[key] || key;

  // This is a placeholder. In a real app, this would come from auth context.
  const currentUserIsAdmin = true; 

  if (!currentUserIsAdmin) {
    return (
      <div className="container mx-auto py-8 px-4 md:px-6 text-center">
        <BadgeInfo className="h-12 w-12 mx-auto text-destructive mb-4" />
        <h1 className="text-2xl font-semibold text-foreground mb-2">Access Denied</h1>
        <p className="text-muted-foreground">You do not have permission to view this page.</p>
      </div>
    );
  }
  
  const handleSaveUser = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const userData = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      role: formData.get('role') as User['role'],
      status: formData.get('status') as User['status'],
    };

    if (editingUser) {
      setUsers(prev => prev.map(u => u.id === editingUser.id ? { ...u, ...userData } : u));
    } else {
      setUsers(prev => [...prev, { ...userData, id: String(Date.now()), lastLogin: t('never') }]);
    }
    // TODO: API call to save/update user via Firebase Admin SDK on backend
    setIsDialogOpen(false);
    setEditingUser(null);
  };
  
  const openEditDialog = (user: User) => {
    setEditingUser(user);
    setIsDialogOpen(true);
  };

  const openNewDialog = () => {
    setEditingUser(null);
    setIsDialogOpen(true);
  };

  const handleDeleteUser = (id: string) => {
    if (confirm(t('confirmDelete'))) {
      setUsers(prev => prev.filter(user => user.id !== id));
      // TODO: API call to delete user via Firebase Admin SDK on backend
    }
  };

  const roleBadge = (role: User['role']) => {
    return role === 'admin' 
      ? <Badge variant="default" className="bg-primary hover:bg-primary/90">{t('admin')}</Badge> 
      : <Badge variant="secondary">{t('user')}</Badge>;
  };

  const statusBadge = (status: User['status']) => {
    switch(status) {
      case 'active': return <Badge className="bg-green-500 hover:bg-green-600">{t('active')}</Badge>;
      case 'invited': return <Badge className="bg-blue-500 hover:bg-blue-600">{t('invited')}</Badge>;
      case 'suspended': return <Badge variant="destructive">{t('suspended')}</Badge>;
      default: return <Badge variant="outline">{status}</Badge>;
    }
  };


  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">{t('title')}</h1>
            <p className="text-muted-foreground mt-2">{t('description')}</p>
        </div>
        <Button onClick={openNewDialog} className="shadow-md">
          <PlusCircle className="mr-2 h-5 w-5" /> {t('addUser')}
        </Button>
      </div>

      <Card className="shadow-lg">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px] hidden sm:table-cell">{/* Avatar */}</TableHead>
                <TableHead>{t('name')}</TableHead>
                <TableHead className="hidden md:table-cell">{t('email')}</TableHead>
                <TableHead>{t('role')}</TableHead>
                <TableHead className="hidden lg:table-cell">{t('status')}</TableHead>
                <TableHead className="hidden xl:table-cell">{t('lastLogin')}</TableHead>
                <TableHead className="text-right">{t('actions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="hidden sm:table-cell">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user.avatarUrl} alt={user.name} data-ai-hint="user avatar"/>
                      <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('').toUpperCase()}</AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell className="hidden md:table-cell text-muted-foreground">{user.email}</TableCell>
                  <TableCell>{roleBadge(user.role)}</TableCell>
                  <TableCell className="hidden lg:table-cell">{statusBadge(user.status)}</TableCell>
                  <TableCell className="hidden xl:table-cell text-muted-foreground">{user.lastLogin || t('never')}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => openEditDialog(user)} className="mr-2">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteUser(user.id)} className="text-destructive hover:text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={(isOpen) => { setIsDialogOpen(isOpen); if (!isOpen) setEditingUser(null); }}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{editingUser ? t('editUser') : t('inviteUser')}</DialogTitle>
             <DialogDescription>
              {editingUser ? `Modify details for ${editingUser.name}.` : "Invite a new user to Nexus Hub."}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSaveUser} className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">{t('name')}</Label>
              <Input id="name" name="name" defaultValue={editingUser?.name} className="col-span-3" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">{t('email')}</Label>
              <Input id="email" name="email" type="email" defaultValue={editingUser?.email} className="col-span-3" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="role" className="text-right">{t('role')}</Label>
              <Select name="role" defaultValue={editingUser?.role || 'user'}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">{t('user')}</SelectItem>
                  <SelectItem value="admin">{t('admin')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
             <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">{t('status')}</Label>
              <Select name="status" defaultValue={editingUser?.status || 'invited'}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">{t('active')}</SelectItem>
                  <SelectItem value="invited">{t('invited')}</SelectItem>
                  <SelectItem value="suspended">{t('suspended')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>{t('cancel')}</Button>
              <Button type="submit">{editingUser ? t('saveUser') : t('inviteUser')}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
