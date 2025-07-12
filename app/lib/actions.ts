'use server';

import {PrismaClient} from '@prisma/client';
import {revalidatePath} from 'next/cache';
import {UserSchema} from '@/app/lib/validators';

const prisma = new PrismaClient();

export async function createUser(formData: FormData) {
    const rawInput = {
        name: formData.get('name'),
        email: formData.get('email'),
        createdAt: new Date(formData.get('createdAt') as string),
    };
    const parse = UserSchema.safeParse(rawInput);
    if (!parse.success) {
        return {validationError: parse.error.flatten().fieldErrors};
    }
    const {name, email, createdAt} = parse.data;
    try {
        await prisma.user.create({
            data: {name, email, createdAt},
        });
    } catch (error: any) {
        console.error(error);
        return {serverError: 'Failed to create user'};
    }
    revalidatePath('/');
    return {success: true};
}

export async function updateUser(formData: FormData) {
    const id = Number(formData.get('id'));
    const rawInput = {
        name: formData.get('name'),
        email: formData.get('email'),
        createdAt: new Date(formData.get('createdAt') as string),
    };
    const parse = UserSchema.safeParse(rawInput);
    if (!parse.success) {
        return {validationError: parse.error.flatten().fieldErrors};
    }
    const {name, email, createdAt} = parse.data;
    try {
        await prisma.user.update({
            where: {id},
            data: {name, email, createdAt},
        });
    } catch (error: any) {
        console.error(error);
        return {serverError: 'Failed to update user'};
    }
    revalidatePath('/');
    return {success: true};
}

export async function deleteUser(id: number) {
    try {
        await prisma.user.delete({
            where: {id},
        });
    } catch (error: any) {
        console.error(error);
        return {serverError: 'Failed to delete user'};
    }
    revalidatePath('/');
    return {success: true};
}

export async function uploadUsersFromExcel(data: any[]) {
    try {
        const validUsers = data.map((row) => ({
            name: row.Name as string,
            email: row.Email as string,
            createdAt: row.CreatedAt ? new Date(row.CreatedAt) : new Date(),
        }));
        await prisma.user.createMany({
            data: validUsers,
            skipDuplicates: true,
        });
        revalidatePath('/');
        return {success: true};
    } catch (error: any) {
        console.error(error);
        return {serverError: 'Failed to import users'};
    }
}