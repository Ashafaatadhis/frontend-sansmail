import { useNavigate } from "react-router-dom";
import { IconArrowLeft } from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import LicenseFormInner from "@/components/LicenseFormInner";

export default function LicenseForm() {
  const navigate = useNavigate();

  return (
    <div className="mt-4">
      <Button
        variant="ghost"
        size="sm"
        className="mb-4"
        onClick={() => navigate("/admin/licenses")}
      >
        <IconArrowLeft className="h-4 w-4 mr-1" />
        Back to Licenses
      </Button>

      <Card className="border-hairline">
        <CardHeader>
          <CardTitle>Generate License</CardTitle>
          <CardDescription>
            Create a new license key for a user.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LicenseFormInner />
        </CardContent>
      </Card>
    </div>
  );
}
