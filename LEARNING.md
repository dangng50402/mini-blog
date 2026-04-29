# Next.js App Router – Core Concepts

---

# 1. Server vs Client Component — 3 điểm khác biệt

## 1.1 Bundle size

**Server Component** không gửi JavaScript xuống browser.
- Component render xong trên server
- Browser chỉ nhận HTML thuần

**Client Component**:
- Toàn bộ code component được đóng gói vào JS bundle
- Tải xuống client để chạy

**Ví dụ:**
- Server Component → 0 byte JS
- Client Component → React runtime + component code + dependencies

---

## 1.2 Hooks

**Server Component**:
- ❌ Không dùng được hooks
- useState, useEffect, useRef, useContext đều không chạy

**Lý do:**
- Hooks cần React runtime (chỉ có ở browser)

**Client Component**:
- ✅ Dùng hooks bình thường

---

## 1.3 Fetch data

### Server Component

```tsx
async function Page() {
  const data = await fetch('/api/users').then(r => r.json())
  return <UserList users={data} />
}
```

- Fetch trực tiếp bằng async/await
- Không cần hook

### Client Component

```tsx
"use client"

function Page() {
  const { data } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers
  })

  return <UserList users={data} />
}
```

- Phải dùng hook hoặc thư viện (TanStack Query)

---

# 2. Khi nào BẮT BUỘC phải có "use client"

## 2.1 Dùng hook

```tsx
"use client"

import { useState } from 'react'

export function SearchBar() {
  const [query, setQuery] = useState('')

  return (
    <input
      value={query}
      onChange={e => setQuery(e.target.value)}
      placeholder="Tìm kiếm..."
    />
  )
}
```

Nếu thiếu → Next.js báo lỗi

---

## 2.2 Dùng browser API / event logic

```tsx
"use client"

import { useRouter } from 'next/navigation'

export function LogoutButton() {
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem('auth-storage')
    router.push('/login')
  }

  return <button onClick={handleLogout}>Đăng xuất</button>
}
```

- useRouter → hook
- localStorage → browser API

---

## ⚠️ Lưu ý

Chỉ cần **1 điều kiện** là đủ để cần "use client"

---

# 3. loading.tsx hoạt động khi nào — liên quan gì đến Suspense
`loading.tsx` chạy khi Server component đang chờ data (async)

`loading.tsx` là shorthand cho React Suspense

## Next.js internal behavior

```tsx
<Suspense fallback={<Loading />}>
  <UsersPage />
</Suspense>
```

---

## Flow hoạt động

1. User click vào route
2. Next.js render `loading.tsx` ngay lập tức
3. Server chạy `page.tsx` (async fetch)
4. Khi xong → replace Loading bằng UI thật

👉 Step 2 & 3 chạy song song

---

## Ý nghĩa

- Không bị blank screen
- Có skeleton/loading UI ngay

---

# 4. Fetch trong Server Component vs useQuery

## 4.1 Server Component fetch

```tsx
async function UsersPage() {
  const users = await fetch('https://jsonplaceholder.typicode.com/users')
    .then(r => r.json())

  return <UserList users={users} />
}
```

### Ưu điểm

- Code đơn giản
- Không có JS fetch ở client
- Data có sẵn khi render
- Dùng được secrets/API key

### Nhược điểm

- Không cache client
- Không background refetch
- Không refetch theo user action

---

## 4.2 useQuery trong Client Component

```tsx
"use client"

function UsersPage() {
  const { data, isPending } = useQuery({
    queryKey: ['users'],
    queryFn: () => fetch('/api/users').then(r => r.json()),
    staleTime: 60_000,
  })

  if (isPending) return <Skeleton />

  return <UserList users={data} />
}
```

### Ưu điểm

- Cache thông minh
- Background refetch
- Optimistic update
- Auto loading/error state

### Nhược điểm

- Bundle lớn hơn
- Có loading state
- Setup phức tạp hơn

---

## Khi nào dùng?

- **Server fetch** → data load 1 lần
- **useQuery** → data dynamic, CRUD, cần sync

---

# 5. next/link vs <a href>

## <a href>

- Hard navigation
- Reload toàn bộ trang
- Mất state

---

## next/link

```tsx
import Link from 'next/link'

<Link href="/users/42">Xem chi tiết</Link>
```

- Client-side navigation
- Không reload
- Giữ state layout

---

## Prefetching

- Link trong viewport → tự preload
- Click → gần như instant

---

## Kết luận

- Internal link → dùng `next/link`
- External link → dùng `<a>`

---

# 🎯 Tổng kết

- Server Component = render server, không JS
- Client Component = interactive, có JS
- loading.tsx = Suspense fallback
- Fetch server = đơn giản, nhẹ
- useQuery = mạnh, dynamic
- next/link = navigation mượt, không reload

